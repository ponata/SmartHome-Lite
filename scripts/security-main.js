window.onload = function () {
  controller.model = model;
  controller.view = view;
  controller.garageHandler();
  controller.cameraHandler();
  controller.cameraHandlerBtn();
  controller.generateUniqueNumbers();
  controller.inputPassHandler();
  controller.lockHandler();
  controller.resetHandler();
  controller.setPasswordHandler();
}

