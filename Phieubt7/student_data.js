const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

function avgScore(s) {
    return s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;
}
function classify(avg) {
    if (avg >= 8.0) return 'Giỏi';
    if (avg >= 6.5) return 'Khá';
    if (avg >= 5.0) return 'Trung bình';
    return 'Yếu';
}

for (let i = 0; i < students.length; i++) {
    const s = students[i];
    s.avg = +(avgScore(s).toFixed(1));
    s.rank = classify(s.avg);
}

console.log('| STT | Tên     | TB   | Xếp loại    |');
console.log('|-----|---------|------|-------------|');
for (let i = 0; i < students.length; i++) {
    const s = students[i];
    const stt = (i + 1).toString().padEnd(3, ' ');
    const name = s.name.padEnd(7, ' ');
    const tb = s.avg.toFixed(1).padEnd(4, ' ');
    const rank = s.rank.padEnd(11, ' ');
    console.log(`| ${stt} | ${name} | ${tb} | ${rank} |`);
}

const counts = {};
for (let i = 0; i < students.length; i++) {
    const r = students[i].rank;
    counts[r] = (counts[r] || 0) + 1;
}
console.log('\nSố SV theo xếp loại:');
for (const k of ['Giỏi', 'Khá', 'Trung bình', 'Yếu']) {
    console.log(`${k}: ${counts[k] || 0}`);
}

let maxAvg = -Infinity, minAvg = Infinity;
for (let i = 0; i < students.length; i++) {
    const a = students[i].avg;
    if (a > maxAvg) maxAvg = a;
    if (a < minAvg) minAvg = a;
}
const best = [];
const worst = [];
for (let i = 0; i < students.length; i++) {
    const s = students[i];
    if (s.avg === maxAvg) best.push(s.name);
    if (s.avg === minAvg) worst.push(s.name);
}
console.log('\nĐiểm TB cao nhất:', maxAvg.toFixed(1), '—', best.join(', '));
console.log('Điểm TB thấp nhất:', minAvg.toFixed(1), '—', worst.join(', '));

let sumMath = 0, sumPhys = 0, sumCS = 0;
for (let i = 0; i < students.length; i++) {
    const s = students[i];
    sumMath += s.math;
    sumPhys += s.physics;
    sumCS += s.cs;
}
const n = students.length;
console.log('\nĐiểm TB lớp theo môn:');
console.log('Math:', (sumMath / n).toFixed(2));
console.log('Physics:', (sumPhys / n).toFixed(2));
console.log('CS:', (sumCS / n).toFixed(2));

const genderSums = {};
const genderCounts = {};
for (let i = 0; i < students.length; i++) {
    const s = students[i];
    const g = s.gender;
    if (!genderSums[g]) genderSums[g] = { math: 0, physics: 0, cs: 0, avg: 0 };
    if (!genderCounts[g]) genderCounts[g] = 0;
    genderSums[g].math += s.math;
    genderSums[g].physics += s.physics;
    genderSums[g].cs += s.cs;
    genderSums[g].avg += s.avg;
    genderCounts[g]++;
}
console.log('\nĐiểm TB theo giới tính:');
for (const g of Object.keys(genderSums)) {
    const cnt = genderCounts[g];
    const sums = genderSums[g];
    console.log(`Gender ${g}: Math ${(sums.math / cnt).toFixed(2)}, Physics ${(sums.physics / cnt).toFixed(2)}, CS ${(sums.cs / cnt).toFixed(2)}, Avg ${(sums.avg / cnt).toFixed(2)}`);
}
