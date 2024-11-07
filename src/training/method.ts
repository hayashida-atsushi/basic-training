/* functionを使ってメソッドを記述してください */

/* アロー関数を使ってメソッドを記述してください */

/* 戻り値の無いメソッドを記述してください */

/* 次の処理の結果はいくつになるか、理由も含めて説明してください。*/
function change(n: number) {
  n = 2;
}
let n = 1;
change(n);
console.log(n);

/* 次の処理の結果はいくつになるか、理由も含めて説明してください。*/
function change2(y: { n: number }) {
  y.n = 2;
}
const x = { n: 1 };
change2(x);
console.log(x.n);

/* 次の処理の結果はいくつになるか、理由も含めて説明してください。*/
function change3(y: { n: number }) {
  y = { n: 2 };
  y.n = 3;
}
const x1 = { n: 1 };
change3(x1);
console.log(x1.n);

/* 配列[a, b, c, ..., z]を受けとってconsoleにa [b, c, ..., z]と出力するメソッドを1行で記述してください。ただし型定義以外で[]を使わないこと。
　 そのメソッドに[4, 5, 6, 7]をエラーをはかず、正常に動作するように渡してください。
*/
