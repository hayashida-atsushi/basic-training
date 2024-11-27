/* 例 */
export function sum(a: number, b: number) {
  return a + b;
}
/* 例2 */
export const multiply = (a: number, b: number): number => {
  return a * b;
};

/* 否定・or・andをそれぞれ記述してください */
function branchProcess(x: number, y: number) {
  if(x !== y) console.log("x!=y");
  if(x >= 10 || y >= 10) console.log("x>=10 or y>=10");
  if(x >= 10 && y >= 10) console.log("x>=10 and y>=10");
}

/* 分岐を3パターンで記述してください */
function branchRoot(x: number) {
  if(x >= 0) {
    console.log("if文での分岐：x>=0");
  } else {
    console.log("if文での分岐：x<=0");
  }

  switch (x) {
    case 0:
      console.log("switch文での分岐：x=0");
      break;
    case -1:
      console.log("switch文での分岐：x=-1");
      break;
    default:
      console.log("switch文での分岐：x!=0,1");
  }

  console.log( x>0?"三項演算子での分岐：x>0":"三項演算子での分岐：x<=0" );
}

/* 数字が要素の配列を作成してください */
const numArray: number[] = [0,10,12,15];

/* 数字が要素の配列からn番目の値を取得してください */
const n: number = 0;
console.log(numArray[n]);

/* 数字が要素の配列からn番目の値を取得してください(分割代入) */
for(let i=0;i<10;i++) {
  numArray[i] = i+10;
}
console.log(numArray);
const numGet = (n: number): number => {
  const [target, ...rest] = numArray.slice(n);
  return target;
}
console.log(numGet(3));

/* オブジェクトを作成してください */
const obj1 = {
  str1: "文字列",
  num: 1,
  flag: true,
  str2: "mojiretsu"
};

/* オブジェクトのプロパティを取得してください */
console.log(obj1.num);

/* オブジェクトのプロパティを取得してください(分割代入) */
const {str1: string1, flag: flag1} = obj1;
console.log(string1,flag1);

/* ループ処理3パターン */
for(const item in obj1) {
  console.log(item);
}

/* オプショナルチェーン */
console.log(obj1?.str1);
let obj2: undefined | {str1: string};
console.log(obj2?.str1);

/* オブジェクトの特定のプロパティに再代入できないようにしてください*/
let obj3: {
  str1: string;
  readonly str2: string;
};
obj3 = {
  str1: "aaa",
  str2: "bbb"
}
obj3.str1 = "xxx";
obj3.str2 = "yyy";

/* オブジェクトのすべてのプロパティに再代入できないようにしてください*/
let obj4 = {
  str1: "string"
} as const;
obj4.str1 = "STRING";
