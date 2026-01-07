var posts=["2025/12/26/CUPS：共享打印机服务/","2025/12/30/temp/","2025/12/26/工作分配的一些思考/","2026/01/07/高斯泼溅技术/","2025/12/26/pages/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };