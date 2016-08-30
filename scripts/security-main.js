window.onload = function () {

  controller.model = model;
  controller.view = view;

  controller.garageHandler();

  controller.cameraHandler();
  controller.addCameraHandler();
  controller.hideCameraHandler();
  controller.hideShowVideoTagHandler();
  controller.setVideoBtnIdHandler();
  controller.removeCameraHandler();

  controller.generateUniqueNumbers();
  controller.inputPassHandler();
  controller.lockHandler();
  controller.resetHandler();
  controller.setPasswordHandler();
  controller.exitWrongPasswordHandler();
  controller.resetLastValueHandler();
  controller.changePasswordBlockHandler();




   var showPassBlock = function() {
    document.querySelector('.set-password-block').classList.add('show-panel');
  }
  document.getElementById('change-password').onclick = showPassBlock;
  

  var tabLinks = document.querySelectorAll('object');

for (var i = 0; i < tabLinks.length; i++) { 
  tabLinks[i].onclick = function() {
    document.querySelector('.password-block').classList.add('tab-content');
    var target = this.getAttribute('data-tabholder').replace('#', '');

    var sections = document.querySelectorAll('.tab-content');
     
    for(var j=0; j < sections.length; j++) {
      sections[j].style.display = 'none';
    }
    
    document.getElementById(target).style.display = 'block';
    
    for(var k=0; k < tabLinks.length; k++) {
      tabLinks[k].removeAttribute('class');
    }
    
    this.setAttribute('class', 'is-active');
    
    return false;
  }
}


}

