% DiaryLens silage sensor simulation for MATLAB Online.
% Values and thresholds are illustrative, simulated, and not validated safety limits.
clear;
clc;
close all;

% Configurable illustrative warning thresholds.
temperatureThresholdC = 35; % Warn at or above this temperature (deg C)
moistureMinPct = 30;         % Warn below this moisture percentage
moistureMaxPct = 70;         % Warn above this moisture percentage
phMin = 3.5;                 % Warn outside this pH range
phMax = 5.5;

% Generate reproducible simulated measurements.
rng(7);
readingCount = 24;
readingNumber = (1:readingCount)';
timestamp = datetime('now') + minutes(5 * (0:readingCount-1)');
temperatureC = 30 + 3 * sin((1:readingCount)' / 4) + randn(readingCount, 1);
moisturePct = 58 + 5 * sin((1:readingCount)' / 5) + 2 * randn(readingCount, 1);
phValue = 4.4 + 0.25 * sin((1:readingCount)' / 6) + 0.12 * randn(readingCount, 1);

% Classify each measurement using the configurable thresholds.
temperatureStatus = repmat("NORMAL", readingCount, 1);
temperatureStatus(temperatureC >= temperatureThresholdC) = "WARNING";
moistureStatus = repmat("NORMAL", readingCount, 1);
moistureStatus(moisturePct < moistureMinPct | moisturePct > moistureMaxPct) = "WARNING";
phStatus = repmat("NORMAL", readingCount, 1);
phStatus(phValue < phMin | phValue > phMax) = "WARNING";
overallStatus = repmat("NORMAL", readingCount, 1);
hasWarning = temperatureStatus == "WARNING" | moistureStatus == "WARNING" | phStatus == "WARNING";
overallStatus(hasWarning) = "WARNING";

% Export labelled values and statuses to the current project folder.
results = table(timestamp, readingNumber, temperatureC, moisturePct, phValue, ...
    temperatureStatus, moistureStatus, phStatus, overallStatus, ...
    'VariableNames', {'Timestamp', 'ReadingNumber', 'Temperature_C', ...
    'Moisture_pct', 'pH', 'Temperature_Status', 'Moisture_Status', ...
    'pH_Status', 'Overall_Status'});
outputFile = fullfile(pwd, 'diarylens_sensor_results.csv');
writetable(results, outputFile);
fprintf('Exported %d simulated readings to %s\n', readingCount, outputFile);

% Plot each measurement and its configured threshold line(s).
figure('Name', 'Simulated Silage Temperature');
plot(timestamp, temperatureC, '-o', 'LineWidth', 1.5); hold on;
yline(temperatureThresholdC, '--r', 'Warning threshold'); hold off;
grid on; xlabel('Time'); ylabel('Temperature (deg C)');
title('SIMULATED DATA: Silage Temperature');

figure('Name', 'Simulated Silage Moisture');
plot(timestamp, moisturePct, '-o', 'LineWidth', 1.5); hold on;
yline(moistureMinPct, '--r', 'Lower warning threshold');
yline(moistureMaxPct, '--r', 'Upper warning threshold'); hold off;
grid on; xlabel('Time'); ylabel('Moisture (%)');
title('SIMULATED DATA: Silage Moisture');

figure('Name', 'Simulated Silage pH');
plot(timestamp, phValue, '-o', 'LineWidth', 1.5); hold on;
yline(phMin, '--r', 'Lower warning threshold');
yline(phMax, '--r', 'Upper warning threshold'); hold off;
grid on; xlabel('Time'); ylabel('pH');
title('SIMULATED DATA: Silage pH');
