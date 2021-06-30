function showMessage(message){
  document.querySelector('#messageText').innerHTML = message;
    let elems = document.querySelector('#messageModal');
    let instance = M.Modal.init(elems, {});
    instance.open();
  };

  function showRemoveConfirmationWindows(message){
      let elems = document.querySelector('#removeConfirmationModal');
      let instance = M.Modal.init(elems, {});
      instance.open();
    };
function closeModal(modalId){
  let elems = document.querySelector('#' + modalId);
  let instance = M.Modal.init(elems, {});
  instance.close();
}
