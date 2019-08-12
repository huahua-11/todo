// pages/todos/todos.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 输入框值
    InputValue:'',
    // 记录条数
    list:0,
    
    todos:[{
      id:0,
      value:55,
      completed:false
    }]


  },


 // 业务逻辑----

 // input框 事件
 handleInput(e){
   this.setData({
    InputValue:e.detail.value
   })
   console.log(e)

 },

 // 添加功能
 addListValue(e){
   let value = e.currentTarget.dataset.value

   // 判断是否输入框为空
   if (!value.length){
     return 
   }
    // 数组去重
   let todos = this.data.todos
   todos = todos.filter((item) => item.value !== value) 

   // 内容添加
   let id = todos.length ? todos[todos.length-1].id +1 : 1
   todos.push({id,value:value,completed:false})
   this.setData({
     todos: todos,
     value:'' // 清空文本框
   }) 
   //重置记录条数-list
   this.calculatTodosLength()
  //  数据存储本地
   wx.setStorage({
     key: 'todos',
     data: todos,
   })
 },


// 单个删除
  delteOnceValue(e){
    let todos = this.data.todos
    todos = todos.filter((item, index) => { e.currentTarget.dataset.index !== index})
    this.setData({
      todos
    })
    this.calculatTodosLength()
    // 数据存储本地
    wx.setStorage({
      key: 'todos',
      data: todos,
    })
  },

//  单行勾选状态变化
  changeCompleted(e){

    let index = e.currentTarget.dataset.index
    let todos = this.data.todos
    todos[index].completed = !todos[index].completed
    this.setData({
      todos
    })
    this.calculatTodosLength()
  },

  // 全选功能  通过some获取一个bool值 ，来设置全部状态
  changeAllCompleted(){
    let todos = this.data.todos
    let togBool = todos.some((item) => !item.completed) // 当其中有一个false的时候，为true，否则false
    todos = todos.map((item)=>{
      item.completed = togBool 
      return item
    })  
     this.setData({
       todos
     })

    this.calculatTodosLength()
  },

 // 批量删除
  clearAllCompleted(){
    let todos =this.data.todos
    todos = todos.filter((item)=>{
      return item.completed !== true
    })
    this.setData({
      todos
    })
    this.calculatTodosLength()

    // 数据存储本地
    wx.setStorage({
      key: 'todos',
      data: todos,
    })
  },

  // 封装记录条数计算
  calculatTodosLength(){
    let list = this.data.todos.filter((item)=> !item.completed).length
    this.setData({
      list
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // 计算记录条数
    this.calculatTodosLength()

    // 将历史记录存储到本地
    let todos = []
    wx.getStorage({
      key: 'todos',
      success: (res)=>{
        todos = res.data
        this.setData({
          list: todos.filter((item)=> !item.completed).length,
          todos
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})