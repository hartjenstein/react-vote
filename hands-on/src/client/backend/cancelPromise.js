export function makeCancelable(promise){
    let hasCanCancled_ = false;

    return {
      promise: new Promise((resolve, reject) => promise 
        .then(r => hasCancancled_ ? reject({isCancled: true}) : resolve(r))
    ),
    cancel(){
      hasCancled_ = true;
    },
  };
};