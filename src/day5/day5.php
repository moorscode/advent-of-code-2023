<?php
declare(strict_types=1);

$data = file_get_contents('part1.txt');
$parts = array_filter(explode("\n\n", $data), static fn($a) => $a);

$seedline = array_shift($parts);

preg_match_all('/\d+/', $seedline, $seedGroups);

$seedGroups = array_map('intval', $seedGroups[0]);

$sections = [];
foreach ($parts as $section) {
    $lines = array_filter(explode("\n", $section), static fn($a) => $a);
    array_shift($lines);

    $maps = [];
    foreach ($lines as $line) {
        preg_match_all('/\d+/', $line, $numbers);
        $maps[] = array_map('intval', $numbers[0]);
    }
    $sections[] = $maps;
}

$lowest = PHP_INT_MAX;
for ($g = 0; $g < count($seedGroups) - 1; $g += 2) {
    echo $g . "...\n";
    for ($s = $seedGroups[$g]; $s <= $seedGroups[$g] + ($seedGroups[$g + 1] - 1); $s++) {
        $n = $s;
        foreach ($sections as $maps) {
            foreach ($maps as $map) {
                if ($n >= $map[1] && $n <= $map[1] + ($map[2] - 1)) {
                    $n = ($n - $map[1]) + $map[0];
                    break;
                }
            }
        }
        $lowest = min($lowest, $n);
    }
}

echo $lowest;
