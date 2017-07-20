setOptions: function(srcType){
      var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true //Corrects Android orientation quirks
  }

  return options;
},
openCamera: function(){
  var srcType = Camera.PictureSourceType.CAMERA;
  var options = this.setOptions(srcType);
  
      // options.targetHeight = 800;
      // options.targetWidth = 600;
  var that = this;
  navigator.camera.getPicture(function cameraSuccess(imageUri) {
      console.log('success')
      console.log(imageUri)
      that.displayImage(imageUri)

  }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

  }, options);
},
openFilePicker: function(){
  var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
  var options = this.setOptions(srcType);

  
      // To downscale a selected image,
      // Camera.EncodingType (e.g., JPEG) must match the selected image type.
      // options.targetHeight = 800;
      // options.targetWidth = 600;
  
  var that = this;
  navigator.camera.getPicture(function cameraSuccess(imageUri) {

      that.displayImage(imageUri)

  }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

  }, options);
},
displayImage: function(imgUri){
  console.log(imgUri);
  this.imageUrl = imgUri;
},
subHandle: function() {

  var PathToResultZip = 'file:///storage/emulated/0/week.zip';

  var fileArr = [];
  var flag = 0;
  var imgUrl = this.imageUrl.split('?')[0];
  fileArr.push(imgUrl)
  console.log(fileArr)

  var params = {
    day: this.week,
    name: this.menuName,
    des: this.des,
    sn: this.sn
  }
  
  Zeep.zipfilelist({
      from: fileArr,
      to: PathToResultZip
  }, function() {
      console.log('zip success!');
      flag = 1;
      if(flag == 1){
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1);
        options.mimeType = "text/plain";
       
        options.params = params;
        var ft = new FileTransfer();
        ft.upload(PathToResultZip, encodeURI('http://xxx/xxx'), win, fail, options);

        function win(){
          console.log('nice')
        }
        function fail(){
          console.log('gg')
        }
      }
  }, function(e) {
      console.log('zip error: ', e);
  });
  
  
}

},
