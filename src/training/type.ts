/* オブジェクトの型を作成してください(2パターン) */
type Sample1 = {
    str: string;
    num: number;
    flag: boolean;
}
const Sample2: {
    str: string;
    num: number;
    flag: boolean;
} = {
    str: "文",
    num: 10,
    flag: true
};
// 中身は変更可能
Sample2.num = 20;

/* 上のオブジェクトに新たなプロパティを追加した型を作成してください */
//インターセクション型を使う。
type Sample1AddObj = Sample1 & {
    obj: object;
};

/* 上のオブジェクトから適当なプロパティを削除した型を作成してください */
//Omitを使う。
type SampleWithoutStr = Omit<Sample1, "str">;

/* 'aaa'または'bbb'の値のみを許容する型を作成してください */
type xxx = 'aaa' | 'bbb';
const currectConst: xxx = 'aaa';
//const wrongConst: xxx = 'ccc';

/*  あるオブジェクトの型を返却(取得)してください */
function returnObj() {
    const obj: Sample1 = {str:"サンプル", num:10, flag:true};
    return typeof obj;
}
console.log(returnObj());

/* 以下のコードを改変して、エラーを出さずに代入してください。ただし型定義はいじらないこと。 */

type example = {
    aaa?:number;
};

type example2 = {
    bbb:number;
}
const aaaa: example = {aaa:2};
const bbbb: example2 = {bbb:1}

bbbb.bbb = aaaa.aaa as number;

/* */