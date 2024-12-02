/* 最終問題：以下の決済管理システムを実装してください
   一部コードは作成されているので追記する形で作成してください。

   1. ユーザーのウォレットを表すオブジェクトの型を定義してください。
   　 必須プロパティは、ウォレットID、 ユーザー名、残高、方法(現金 or クレジットカード or 銀行振込をそれぞれ示す0, 1, 2のいずれか)、取引履歴
    　任意プロパティに、クーポンを設定してください。クーポンは複数所持できます。
　 2. ウォレットのリストを作成してください。要素数は5つとします。
   3. 決済機能を実装してください。決済機能はIDと決済額を指定して、残高から指定金額を差し引いてその値を返します。
      クーポンを所持している場合は、クーポンに記載の金額分割引を行ってください。
      複数所持している場合は、金額の最も大きいものを優先的に使ってください。
      使ったクーポンは削除してください。
      決済が不正の場合はエラーメッセージを出力してください。
      支払いが成功した場合はさらに、決済の取引履歴に追記してください。
      取引履歴の1レコードはウォレットID、金額、種別(チャージ or 決済)、方法(現金 or クレジットカード or 銀行振込をそれぞれ示す0, 1, 2のいずれか)、日時、残高をプロパティに持ちます。
   4. チャージ機能を実装してください。チャージ機能はIDと金額を指定します。
      チャージが成功した場合は取引履歴に追記してください。
      チャージが不正が指定された場合はエラーを返してください。
   5. IDを指定して、取引履歴を取得する機能を実装してください。
      その際、戻り値の取引履歴のチャージ方法は数字ではなく、現金、クレジットカード、銀行振込のいずれかの表記に変換してください。
      さらに、if文や三項演算子などの条件分岐を用いないこと。
   6. IDを指定して、ウォレットの残高を取得する機能を実装してください。
*/

/*
   1. ユーザーのウォレットを表すオブジェクトの型を定義してください。
   　 必須プロパティは、ウォレットID、 ユーザー名、残高、方法(現金 or クレジットカード or 銀行振込をそれぞれ示す0, 1, 2のいずれか)、取引履歴
    　任意プロパティに、クーポンを設定してください。クーポンは複数所持できます。
*/
type Coupon = {
  couponId: number;
  couponName: string;
  amount: number;
};

const coupon_100: Coupon = { couponId: 1, couponName: "coupon_100",amount: 100 };
const coupon_500: Coupon = { couponId: 2, couponName: "coupon_500", amount: 500 };
const coupon_1000: Coupon = { couponId: 3, couponName: "coupon_1000", amount: 1000 };

type Wallet = {
  walletId: number;
  username: string;
  balance: number;
  method: 0 | 1 | 2;
  transactionHistroy: Transaction[];
  coupon?: Coupon[];
};

type Transaction = {
   walletId: number;
   paymentAmount: number;
   transactionType: string;
   method: 0 | 1 | 2;
   transactionDate: Date;
   balance: number;
};

/*
　 2. ウォレットのリストを作成してください。要素数は5つとします。
*/
export const userWallet: Wallet[] = [
   {walletId:1, username: "田中一郎", balance: 10000, method: 1, transactionHistroy: []},
   {walletId:2, username: "田中二郎", balance: 10000, method: 0, transactionHistroy: [], coupon: [coupon_100]},
   {walletId:3, username: "田中三郎", balance: 10000, method: 2, transactionHistroy: [], coupon: [coupon_100, coupon_500]},
   {walletId:4, username: "田中四郎", balance: 10000, method: 1, transactionHistroy: [], coupon: [coupon_100, coupon_1000]},
   {walletId:5, username: "田中五郎", balance: 10000, method: 0, transactionHistroy: [], coupon: [coupon_100, coupon_500,coupon_1000]}
];

/*
   3. 決済機能を実装してください。決済機能はIDと決済額を指定して、残高から指定金額を差し引いてその値を返します。
      クーポンを所持している場合は、クーポンに記載の金額分割引を行ってください。
      複数所持している場合は、金額の最も大きいものを優先的に使ってください。
      使ったクーポンは削除してください。
      決済が不正の場合はエラーメッセージを出力してください。
      支払いが成功した場合はさらに、決済の取引履歴に追記してください。
      取引履歴の1レコードはウォレットID、金額、種別(チャージ or 決済)、方法(現金 or クレジットカード or 銀行振込をそれぞれ示す0, 1, 2のいずれか)、日時、残高をプロパティに持ちます。

   方針
      ・wallteIdなし or 決済額>残高ならエラー
      ・処理対象のwalletを取り出す。（if文の中で皇族の処理をするのは読みずらい）
      ・クーポンの割引額取得。
*/
export const doSettlement = (walletId: number, paymentAmount: number): void => {

   // 処理対象のウォレットのインデックスを所得する。
   function getwalltId(): number {
      for ( let i = 0; i < userWallet.length; i++ ) {
         if (userWallet[i].walletId === walletId && userWallet[i].balance >= paymentAmount) {
            return i;
         }
      }
      return -999;
   }
   // 割引額を取得する。
   function getCouponAmount(): number {
      let maximunAmount = 0;
      let targetCoupon = 0;
      if (userWallet[targetWalletId].coupon) {
         for (let i=0; i < userWallet[targetWalletId].coupon.length; i++) {
            if( maximunAmount < userWallet[targetWalletId].coupon[i].amount) {
               maximunAmount = userWallet[targetWalletId].coupon[i].amount;
               targetCoupon = i;
            }
         }
         userWallet[targetWalletId].coupon.splice(targetCoupon,1);
      }
      return maximunAmount;
   }

   const targetWalletId = getwalltId();
   if (targetWalletId < 0) {
      throw new Error("something wrong!");
   }

   const discountAmount = getCouponAmount();

   // 残高更新
   userWallet[targetWalletId].balance -= (paymentAmount - discountAmount);

   // 取引履歴作成
   const transactionAchievement: Transaction = {
      walletId: targetWalletId,
      paymentAmount: paymentAmount,
      transactionType: "決済",
      transactionDate: new Date(),
      method: userWallet[targetWalletId].method,
      balance: userWallet[targetWalletId].balance,
   }

   userWallet[targetWalletId].transactionHistroy.push(transactionAchievement);
}