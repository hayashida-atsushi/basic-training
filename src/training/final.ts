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

type Coupon = {
  couponId: number;
  couponName: string;
  amount: number;
};

// enumではなくこちらを使うコーディングは要調査
const PAYMENT_METHOD= {
   現金:{
      code: 0
   },
   クレジットカード: {
      code: 1
   },
   銀行振り込み: {
      code: 2
   }
} as const;

enum PAYMENT_METHOD_ENUM {
   現金=0,
   クレジットカード=1,
   銀行振り込み=2,
}

enum TRANSACTION_TYPE_ENUM {
   決済 = 0,
   チャージ = 1,
}

const coupon_100: Coupon = { couponId: 1, couponName: "coupon_100",amount: 100 };
const coupon_500: Coupon = { couponId: 2, couponName: "coupon_500", amount: 500 };
const coupon_1000: Coupon = { couponId: 3, couponName: "coupon_1000", amount: 1000 };

type Wallet = {
  walletId: number;
  username: string;
  balance: number;
  method: 0 | 1 | 2;
  transactionHistory: Transaction[];
  coupon?: Coupon[];
};

type Transaction = {
   walletId: number;
   paymentAmount: number;
   transactionType: TRANSACTION_TYPE_ENUM.決済 | TRANSACTION_TYPE_ENUM.チャージ;
   method: PAYMENT_METHOD_ENUM.現金 | PAYMENT_METHOD_ENUM.クレジットカード | PAYMENT_METHOD_ENUM.銀行振り込み;
   transactionDate: Date;
   balance: number;
};

export const userWallets: Wallet[] = [
   {walletId:1, username: "田中一郎", balance: 10000, method: 1, transactionHistory: []},
   {walletId:2, username: "田中二郎", balance: 10000, method: 0, transactionHistory: [], coupon: [coupon_100]},
   {walletId:3, username: "田中三郎", balance: 10000, method: 2, transactionHistory: [], coupon: [coupon_100, coupon_500]},
   {walletId:4, username: "田中四郎", balance: 10000, method: 1, transactionHistory: [], coupon: [coupon_100, coupon_1000]},
   {walletId:5, username: "田中五郎", balance: 10000, method: 0, transactionHistory: [], coupon: [coupon_100, coupon_500,coupon_1000]}
];

export const doSettlement = (walletId: number, paymentAmount: number): void => {

   // 処理対象のウォレットのインデックスを所得する。
   const getIndex = (): number => { 
      const indices = userWallets.map( (userWallet,index) => {
         if (userWallet.walletId === walletId && userWallet.balance >= paymentAmount) {
            return index;
         }
         return -999;
      }).filter(index => index !== -999);
      return indices[0];
   }
   // 割引額を取得する。
   const getCouponAmount = (targetIndex: number): number => {

      const getTargetCouponAmount = ():number => {
         if (userWallets[targetIndex].coupon) {
            const couponAmount = userWallets[targetIndex].coupon.reduce(
               (max, coupon) => Math.max(max, coupon.amount as unknown as number), 0);

            const unuseCouponList: Coupon[] = [];
            userWallets[targetIndex].coupon.forEach( (couponItem) => {
               if (couponItem.amount !== couponAmount) unuseCouponList.push(couponItem);
            });

            userWallets[targetIndex].coupon = unuseCouponList;

            return couponAmount;
         }
         return 0;
      }

      return getTargetCouponAmount(); 
   }

   const targetWalletIndex = getIndex();
   console.log(targetWalletIndex);
   if (typeof targetWalletIndex !== 'number') {
      throw new Error("Can't Buy!!");
   }

   const discountAmount = getCouponAmount(targetWalletIndex);
   // 残高更新
   userWallets[targetWalletIndex].balance -= (paymentAmount - discountAmount);

   // 取引履歴作成
   const transactionAchievement: Transaction = {
      walletId: userWallets[targetWalletIndex].walletId,
      paymentAmount: paymentAmount - discountAmount,
      transactionType: TRANSACTION_TYPE_ENUM.決済,
      transactionDate: new Date(),
      method: userWallets[targetWalletIndex].method,
      balance: userWallets[targetWalletIndex].balance,
   }

   userWallets[targetWalletIndex].transactionHistory.push(transactionAchievement);
}

export const doCharge = (walletId: number, chargeAmount: number) => {

   // IDの存在精査
   const getIndex = (): number => { 
      const indices = userWallets.map( (userWallet,index) => {
         if (userWallet.walletId === walletId) {
            return index;
         }
         return -999;
      }).filter(index => index !== -999);
      return indices[0];
   }

   const targetWalletIndex = getIndex();
   if (typeof targetWalletIndex !== 'number') {
      throw new Error("Can't Charge!!");
   }
   
   //残高更新
   userWallets[targetWalletIndex].balance += chargeAmount;

   // 取引履歴作成
   const transactionAchievement: Transaction = {
      walletId: userWallets[targetWalletIndex].walletId,
      paymentAmount: chargeAmount,
      transactionType: TRANSACTION_TYPE_ENUM.チャージ,
      transactionDate: new Date(),
      method: userWallets[targetWalletIndex].method,
      balance: userWallets[targetWalletIndex].balance,
   }

   userWallets[targetWalletIndex].transactionHistory.push(transactionAchievement);
};

export const getTransactionHistory = (walletId: number): Object[] => {
   
   // IDの存在精査
   const getIndex = (): number => { 
      const indices = userWallets.map( (userWallet,index) => {
         if (userWallet.walletId === walletId) {
            return index;
         }
         return -999;
      }).filter(index => index !== -999);
      return indices[0];
   }

   const targetWalletIndex = getIndex();
   if (typeof targetWalletIndex !== 'number') {
      throw new Error("Can't Show History!!");
   }

   const transactionHistoryList: Object[] = [];

   if(userWallets[targetWalletIndex].transactionHistory) {
      userWallets[targetWalletIndex].transactionHistory.forEach((sourceItem) => {
         const targetItem: Object = {
            walletId: sourceItem.walletId,
            paymentAmount: sourceItem.paymentAmount,
            transactionType: TRANSACTION_TYPE_ENUM[sourceItem.transactionType],
            method: PAYMENT_METHOD_ENUM[sourceItem.method],
            transactionDate: sourceItem.transactionDate,
            balance: sourceItem.balance,   
         }
         transactionHistoryList.push(targetItem);
      });
   }
   
   return transactionHistoryList;
};


export const showBalance = (walletId: number): number => {

   // IDの存在精査
   const getIndex = (): number => { 
      const indices = userWallets.map( (userWallet,index) => {
         if (userWallet.walletId === walletId) {
            return index;
         }
         return -999;
      }).filter(index => index !== -999);
      return indices[0];
   }

   const targetWalletIndex = getIndex();
   console.log(targetWalletIndex);
   if (typeof targetWalletIndex !== 'number') {
      throw new Error("Can't Show Balance!!");
   }

   return userWallets[targetWalletIndex].balance;
};