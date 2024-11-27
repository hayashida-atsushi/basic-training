import { Dayjs } from "dayjs";

const dayjs = require('dayjs');

/* functionを使ってメソッドを記述してください */
function sampleMethod() {
  return null;
};

/* アロー関数を使ってメソッドを記述してください */
const sampleMethod2 = () => {
  return null;
};

/* 戻り値の無いメソッドを記述してください */
function sampleMethod3(): void {
}

/* 次の処理の結果はいくつになるか、理由も含めて説明してください。*/
function change(n: number) {
  n = 2;
}
let n = 1;
change(n);
console.log(n);

/*
答え 1
理由
関数change内で定義されたnのスコープは関数の中のみであるため、l17で定義したnに再代入されない。
*/

/* 次の処理の結果はいくつになるか、理由も含めて説明してください。*/
function change2(y: { n: number }) {
  y.n = 2;
}
const x = { n: 1 };
change2(x);
console.log(x.n);

/*
答え 2
理由
xとyが同じオブジェクトを参照しているため、yのプロパティの変更がxのプロパティに影響するため。
*/

/* 次の処理の結果はいくつになるか、理由も含めて説明してください。*/
function change3(y: { n: number }) {
  y = { n: 2 };
  y.n = 3;
}
const x1 = { n: 1 };
change3(x1);
console.log(x1.n);

/*
答え 1
理由
l45でyの参照先が変わったため、yでの変更がx1のプロパティに影響しないため。
*/

/* 配列[a, b, c, ..., z]を受けとってconsoleにa [b, c, ..., z]と出力するメソッドを1行で記述してください。ただし型定義以外で[]を使わないこと。
　 そのメソッドに[4, 5, 6, 7]をエラーをはかず、正常に動作するように渡してください。
*/
const numArray: number[] = [4, 5, 6, 7];

function logOutput (...numArray: number[]) { console.log( numArray.shift(), numArray ) };
logOutput(...numArray);

/* dayjsをimportして、'yyyy-mm-dd': stringで受け取った日付を使って、その日付と同じ月の月末を'yyyy-mm-dd':stringで返すメソッドを作成してください。 */
function dateFormatter(targetDate: string) {
  const sourceDate: string = dayjs(targetDate).endOf('month').format('YYYY-MM-DD');
  return sourceDate;
};

console.log(dateFormatter('1999-11-14'));