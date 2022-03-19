<template>
  <div class>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="a"></div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
           <el-button @click="addUser" type="primary">确 定</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <!-- 分配角色 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页列表区域 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination> -->
      <!-- <vxe-table
          border
          resizable
          highlight-hover-row
          highlight-current-row
          height="300"
          :data="tableData8"
          :radio-config="{labelField: 'role'}"
          >
          <vxe-column type="checkbox" title="Name"></vxe-column>
          <vxe-column type="checkbox" title="Role"></vxe-column>
          <vxe-column type="checkbox" field="sex" title="Sex"></vxe-column>
          <vxe-column type="checkbox" field="age" title="Age"></vxe-column>
          <vxe-column field="address" title="Address" show-overflow></vxe-column>
        </vxe-table> -->

      <a-table :columns="columns" :data-source="data" :customRow="customRow">
        <a slot="全选" slot-scope="text, record" @click="secletAll(record)"
          >全选</a
        >
        <template
          v-for="(item, index) in tagList"
          :slot="item.tagname"
          slot-scope="text"
        >
          <!-- <span >{{text}}</span> -->
          <a-checkbox
            :checked="text"
            :key="index"
            @change="
              (e) => {
                onChange(e, index)
              }
            "
          ></a-checkbox>
        </template>
      </a-table>
    </el-card>
    <!-- 添加用户的对话框 -->
        <el-dialog title="提示消息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed" >
        <span>
          <!-- {{content}} -->
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible=false">取 消</el-button>
            <el-button @click="addUser" type="primary">确 定</el-button>
        </span>
      <!-- </span> -->
    </el-dialog>
    <!-- <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed" >
        <span>
          <el-form :model="addForm" :rules="addFormRules"  ref="addFormRef" label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible=false">取 消</el-button>
            <el-button @click="addUser" type="primary">确 定</el-button>
        </span>
      </span>
    </el-dialog> -->
    <!-- 编辑用户对话框 -->
    <!-- <el-dialog
        title="修改用户"
        :visible.sync="setdialogVisible"
        width="50%"
        @close="setdialogClose">
        <span>
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
             <el-form-item label="用户名">
              <el-input v-model="editForm.username" disabled></el-input>
             </el-form-item>
             <el-form-item label="邮箱" prop="email">
                <el-input v-model="editForm.email"></el-input>
             </el-form-item>
             <el-form-item label="手机" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
             </el-form-item>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
    </el-dialog> -->
  </div>
</template>




<script>
var resizeFlag = false
window.onresize = function () {
  var target = this
  if (target.resizeFlag) {
    console.log(124)
  }
}
// import func from 'vue-editor-bridge'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 1,
    复选框1: false,
    复选框3: false,
    复选框2: true,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 2,
    复选框1: true,
    复选框3: false,
    复选框2: false,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 3,
    复选框1: false,
    复选框3: true,
    复选框2: true,
  },
]
export default {
  data() {
    //   验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号码'))
    }
    return {
      tagList: [],
      data,
      columns,
      queryInfo: {
        // 搜索关键字
        query: '',
        // 当前页数
        pagenum: 1,
        //当前每页显示数据条数
        pagesize: 2,
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名长度在3到 10个字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名长度在6到 15个字符之间',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      setdialogVisible: false,
      editForm: {},
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      defaultSelecteRows: [10002, 10003],
      tableData8: [
        {
          id: 10001,
          name: 'Test1',
          role: 'Develop',
          sex: 'Man',
          age: 28,
          address: 'vxe-table 从入门到放弃',
        },
        {
          id: 10002,
          name: 'Test2',
          role: 'Test',
          sex: 'Women',
          age: 22,
          address: 'Guangzhou',
        },
        {
          id: 10003,
          name: 'Test3',
          role: 'PM',
          sex: 'Man',
          age: 32,
          address: 'Shanghai',
        },
        {
          id: 10004,
          name: 'Test4',
          role: 'Designer',
          sex: 'Women',
          age: 23,
          address: 'vxe-table 从入门到放弃',
        },
        {
          id: 10005,
          name: 'Test5',
          role: 'Develop',
          sex: 'Women',
          age: 30,
          address: 'Shanghai',
        },
        {
          id: 10006,
          name: 'Test6',
          role: 'Designer',
          sex: 'Women',
          age: 23,
          address: 'vxe-table 从入门到放弃',
        },
        {
          id: 10007,
          name: 'Test7',
          role: 'PM',
          sex: 'Women',
          age: 38,
          address: 'Shanghai',
        },
        {
          id: 10008,
          name: 'Test8',
          role: 'Designer',
          sex: 'Man',
          age: 24,
          address: 'vxe-table 从入门到放弃',
        },
        {
          id: 10009,
          name: 'Test9',
          role: 'Test',
          sex: 'Man',
          age: 35,
          address: 'Shanghai',
        },
        {
          id: 10010,
          name: 'Test10',
          role: 'Develop',
          sex: 'Women',
          age: 31,
          address: 'Shanghai',
        },
      ],
      rowIndex: 0,
    }
  },
  watch: {
    rowIndex() {
      return 0
    },
    colIndex() {
      return 0
    },
  },
  mounted() {
    const _permute = (string) => {
      if (string.length === 1) {
        return [string]
      }
      console.log(string)

      const results = []
      for (let s of string) {
        const arr = string.split('').filter((str) => str !== s)
        console.log(arr) // [b,c]
        // console.log( _permute(arr.join('')))
        // debugger
        _permute(arr.join('')).forEach((item) => {
          console.log(s, item)
          results.push(s + item)
          console.log(results)
        })
      }
      console.log(results)
      return results
    }
    console.log(_permute('abc'))

    function _reduce(arr) {
      let sum = 0
      for (var i of arr) {
        console.log(i)
        sum = Number(sum) + Number(i)
        // console.log(sum)
      }
      return sum
    }
    console.log(_reduce([1, 2, 3, 0, 88]))
    // console.log(count('hello world'))
    // function count(str) {
    //   let obj = {}
    //   for (let val of str) {
    //     if (val === ' ') continue
    //     if (val in obj) {
    //       obj[val]++
    //     } else {
    //       obj[val] = 1
    //     }
    //   }
    //   return obj
    // }

    // console.log(removeWithoutCopy([1, 2, 2, 2, 3, 4, 5, 5, 6, 7], 2))
    function removeWithoutCopy(arr, item) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
          console.log(i)
          arr.splice(i, 1)
        }
      }
      return arr
    }
    //
    function makeLongerArr(arr, idx) {
      let newarr = arr.slice(0, idx)
      newarr[idx - 1] = newarr[idx - 1] + arr[idx]
      return newarr
    }
    function compare(arr1, arr2) {
      let res
      arr1.some((i, index) => {
        console.log(i)
        res = Number(i || 0) - Number(arr2[index] || 0)
        return res
      })
      if (res > 0) return 1
      if (res < 0) return -1
      if (res == 0) return 0
    }
    // let result = compareVersion('0.20.08', '0.20.8') // 0
    let result = compareVersion('0.20.04', '0.020.8') // 0
    // console.log(result)
    function compareVersion(v1, v2) {
      //第一步先去掉版本号每一项前面的0
      const v1Arr = v1.split('.').map((i) => {
        return i.replace(/^0{1,}/, '')
      })
      const v2Arr = v2.split('.').map((i) => {
        return i.replace(/^0{1,}/, '')
      })
      console.log('449', v1Arr, v2Arr)
      let res = v1Arr.length - v2Arr.length
      if (res == 0) {
        return compare(v1Arr, v2Arr)
      } else if (res > 0) {
        return compare(v1Arr, v2Arr)
      } else if (res < 0) {
        return compare(v2Arr, v1Arr)
      }
    }
  },
  created() {
    //     class Stack {
    //     constructor() {
    //     this.arr = []
    //     }
    //     in(value) {
    //         // 你的代码
    //         this.arr.push(value)
    //     }
    //     out() {
    //         // 你的代码
    //         let value = this.arr.pop()
    //         console.log(value)
    //          return value
    //     }
    //     top() {
    //         // 你的代码
    //         let value = this.arr.pop()
    //         console.log(value)
    //         this.arr.push(value)
    //         return value
    //     }
    //     size() {
    //         // 你的代码
    //         console.log(this.arr.length)
    //     }
    // }

    // // 要求当执行下列代码时，能输出预期的结果
    // const stack = new Stack()
    // stack.in('x')
    // stack.in('y')
    // stack.in('z')

    // stack.top() // 输出 'z'
    // stack.size() // 输出 3

    // stack.out() // 输出 'z'
    // stack.top() // 输出 'y'
    // stack.size() // 输出 2
    const address = [
      {
        id: 1,
        name: '北京市',
        children: [
          {
            id: 11,
            name: '海淀区',
            children: [
              {
                id: 111,
                name: '中关村',
              },
            ],
          },
          {
            id: 12,
            name: '朝阳区',
          },
        ],
      },
      {
        id: 2,
        name: '河北省',
      },
    ]
    // console.log(getNameById(address, 2))
    // console.log(getNameById(address, 111))
    // 请实现该函数
    // 输入：getNameById(address, 2)，输出："河北省"
    // 输入：getNameById(address, 111)，输出："中关村"
    // 输入：getNameById(address, 32)，输出："" （未查找到，输出空字符串）
    function getNameById(address, id) {
      // 在这里实现你的代码
      // function each(address,id) {
      let result = ''
      for (var i in address) {
        let item = address[i]
        if (item.id == id) {
          result = item.name
        } else if (item.children) {
          result = getNameById(item.children, id)
        }
      }
      return result
      // }
    }
    var deelyNesteObj = {
      a: {
        b: {
          c: {
            d: 123,
          },
        },
      },
    }
    function sefeGet(obj, str, defVal) {
      //请在这里实现
      const keyArr = str.match(/[a-zA-Z0-9]{1,}/g)
      console.log('610,检验正则', keyArr, obj)
      let current = obj
      keyArr.forEach((i) => {
        // console.log(current, current[i], i)
        current = (current && current[i]) || 'undefined'
        // console.log(current)
      })
      return current == 'undefined' ? defVal : current
    }
    //  sefeGet(deelyNesteObj, 'a.b.c.d', 'alipay') // 123
    // let res =sefeGet(deelyNesteObj, ' a. b..c..d') // 123
    let res = sefeGet(deelyNesteObj, 'a..77') // undefined
    //  sefeGet(deelyNesteObj, 'a.b.c1.d', 'alipay') // alipay
    // let res = sefeGet(deelyNesteObj, 'a.b.c.d.e.f.g.h') // undefined
    // console.log(res)

    // var name = 1
    // function test() {
    //   var name = 2
    //   console.log(this.name)

    //   return function inner() {
    //     console.log(name)
    //   }
    // }
    // // test()
    // // test()()
    // var b = {
    //   name: 3,
    // }
    // b.test = test
    // // b.test()
    // var c = b.test
    // // c()
    // new test()

    const makeLongerArr = (arr, idx) => {
      let newArr = arr.slice(0, idx)
      let addArr = arr.slice(idx)
      console.log(newArr, addArr)
      newArr[newArr.length - 1] = newArr[newArr.length - 1] + addArr.join('')
      console.log(newArr, addArr)
      return newArr
    }

    const compare = (arr1, arr2) => {
      let num
      console.log('compare', arr1, arr2)
      const valid = arr1.some((item, idx) => {
        num = Number(item || 0) - Number(arr2[idx] || 0)
        return num !== 0
      })
      if (!valid) return 0
      if (num > 0) return 1
      if (num < 0) return -1
    }

    const compareVersion = (version1, version2) => {
      const v1Arr = version1.split('.').map((i) => {
        return i.replace(/^0{1,}/, '')
      })
      const v2Arr = version2.split('.').map((i) => {
        return i.replace(/^0{1,}/, '')
      })
      const v1Len = v1Arr.length
      const v2Len = v2Arr.length
      const num = v1Len - v2Len
      if (num > 0) return compare(makeLongerArr(v1Arr, v2Len), v2Arr)
      if (num < 0) return compare(v1Arr, makeLongerArr(v2Arr, v1Len))
      if (num == 0) return compare(v1Arr, v2Arr)
    }
    let res1 = compareVersion('0.3.343.12.8.9', '0.3.033.12')
    // console.log('610', res1)

    const accountsMerge = (accounts) => {
      const findEmailItem = (arr) => {
        return arr.filter((i) => /@mail.com$/.test(i))
      }

      const isCommonEmail = (arr1, arr2) => {
        let arr = arr1.concat(arr2)
        let finArr = [...new Set(arr)]
        if (arr.length === finArr.length) return false
        return finArr
      }

      let count = 0
      do {
        let delIdx = -1
        accounts.some((i, idx) => {
          console.log('577', count, idx, i)
          if (count === idx) return false
          let orginArr = accounts[count] //
          findEmailItem(orginArr)
          console.log('581', findEmailItem(orginArr))
          let dedupArr = isCommonEmail(
            findEmailItem(orginArr),
            findEmailItem(i)
          )
          console.log('583', dedupArr)
          if (dedupArr) {
            let nameArr = orginArr.filter((i) => !dedupArr.includes(i))
            console.log('586', nameArr)
            accounts[count] = nameArr.concat(dedupArr)
            delIdx = idx
            return true
          } else {
            delIdx = -1
            return false
          }
        })

        if (delIdx >= 0) {
          accounts.splice(delIdx, 1)
        }

        count++
        console.log('602', count)
      } while (count < accounts.length - 1)

      return accounts
    }
    let emailArr = [
      ['joins', 'joinmax@mail.com', '3342youxiang@mail.com'],
      ['join', 'joinsmat@mail.com', 'joinmax@mail.com'],
      [
        'susan',
        'susanstart@mail.com',
        'xiangxiang@mail.com',
        'zhifuxiazi@mail.com',
      ],
      ['susan', 'zhifuxiazi@mail.com'],
    ]
    // var str = [0, 1, 2, 3, 4, '5', 6, 7, 8, 3, 4]
    // let obj = new Set(str)
    // let strArr = []
    // console.log('621', obj)
    // let a = str.map((i, key) => {
    //   return (str[key] = i * i)
    // })
    // console.log(a)
    // console.log(accountsMerge(emailArr))
    const accountsMerges = (accounts) => {
      let count = 0
      //去掉用户名称之后的邮箱
      const filterUser = (arr) => {
        console.log(arr.slice(1, arr.length))
        return arr.slice(1, arr.length)
      }
      const setArr = (arr1, arr2) => {
        //比较去掉用户名称之后的两组邮箱
        let concatArr = arr1.concat(arr2) // 先合并 后去重
        let sortArr = [...new Set(concatArr)]
        let res = concatArr.length == sortArr.length
        if (res) {
          // 没有重复的邮箱 那么就返回false
          return false
        } else {
          // 有重复的邮箱 返回去重后的邮箱数组
          return sortArr
        }
      }
      do {
        accounts.some((i, idx) => {
          if (count == idx) return false
          let filterNewArr = accounts[count]
          let result = setArr(filterUser(filterNewArr), filterUser(i))
          console.log('641', count, idx, result)
          if (result) {
            // 有重复的邮箱的情况
            let newItem = filterNewArr.filter((o) => !result.includes(o))
            console.log('678', newItem)
            accounts[count] = newItem.concat(result)
            console.log('680', accounts, count, idx)
            accounts.splice(idx, 1)
            console.log('682', filterNewArr, newItem, accounts)
          }
        })
        count++
      } while (count < accounts.length - 1)
      return accounts
    }
    // console.log(accountsMerges(emailArr))
    // console.log()
    // function delay(fn, time) {
    //   let flag = true
    //   return function () {
    //     if (!flag) {
    //       return
    //     } else {
    //       flag = false
    //       setTimeout(() => {
    //         fn()
    //         flag = true
    //       }, time)
    //     }
    //   }
    // }
    // function delay1(fn, time) {
    //   let timer = null
    //   return function () {
    //     if (timer) {
    //       clearTimeout(timer)
    //     }
    //     timer = setTimeout(fn, time)
    //   }
    // }
    // var str = ''
    // for (var i = 1; i <= 9; i++) {
    //   for (var j = i; j <= 9; j++) {
    //     // str=str+i+'*'+j+'='+i*j+' '
    //     str = str + '☆'
    //   }
    //   str = str + '\n'
    // }
    // // console.log(str)
    // var arr1 = [12, 123, 22, 213, 45, 1, 2, 3, 3, 4, 77, 213, 22, 20]
    // var newArr = []
    // for (var i = 0; i <arr1.length; i++) {
    //   if (!newArr.includes(arr1[i])) {
    //     newArr.push(arr1[i])

    //   }
    // }
    // arr1.map((i,index)=>{
    //   arr1.indexOf(i)===index&&newArr.push(i)
    // })
    // let res = [...(new Set(arr1))]
    // console.log(res)

    // this.getUsersList()
    this.columns.push({
      title: '复选框1',
      dataIndex: '复选框1',
      key: '复选框1',
      scopedSlots: { customRender: '复选框1' },
      checkbox: true,
    })
    this.columns.push({
      title: '复选框2',
      dataIndex: '复选框2',
      key: '复选框2',
      scopedSlots: { customRender: '复选框2' },
      checkbox: false,
    })
    this.columns.push({
      title: '复选框3',
      dataIndex: '复选框3',
      key: '复选框3',
      scopedSlots: { customRender: '复选框3' },
      checkbox: false,
    })
    this.columns.push({
      title: '全选',
      dataIndex: () => {
        ;<span>全选</span>
      },
      key: '全选',
      scopedSlots: { customRender: '全选' },
      checkbox: false,
    })
    this.tagList = [
      { tagname: '复选框1' },
      { tagname: '复选框2' },
      { tagname: '复选框3' },
    ]
  },
  methods: {
    windowResizeEvent() {},
    add(num1, num2) {
      console.log(num1, num2)
      var sum = num1 + num2
      if (num2 == 100) {
        console.log('大于100', sum)
        return sum
      } else {
        console.log(sum)
        this.add(sum, num2 + 1)
      }

      // console.log(sum)
      return sum
    },
    customRow(record, index) {
      return {
        on: {
          // 事件
          click: (event) => {
            console.log(record, index)
            this.rowIndex = index
          }, // 点击行
        },
      }
    },
    onChange(e, index) {
      console.log(e, this.rowIndex)
      let tagname = this.tagList[index].tagname
      console.log(tagname, this.data[this.rowIndex][tagname])
      this.data[this.rowIndex][tagname] = e.target.checked
    },
    secletAll(item) {},
    async getUsersList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo,
      })
      //   console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userList = res.data.users
      this.total = res.data.total
    },
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this.getUsersList()
    },
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage
      this.getUsersList()
    },
    async changeStatus(userinfo) {
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status != 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功')
    },
    // add() {
    //   let num = 0
    //   // console.log(num++)
    // },
    addUser() {
      function delay(fn, time) {
        console.log(fn, time)
        let flag = true
        return function () {
          if (!flag) {
            return false
          }
          console.log(flag)
          flag = false
          setTimeout(() => {
            fn()
            // console.log(time)
            flag = true
          }, time)
        }
      }

      // delay(this.add, 2000)
      // this.$refs.addFormRef.validate(async (valid) => {
      //   if (!valid) return
      //   const { data: res } = await this.$http.post('users', this.addForm)
      //   console.log(res)
      //   if (res.meta.status != 201) {
      //     this.$message.error('添加用户失败！')
      //   }
      //   this.$message.success('添加用户成功！')
      //   // 隐藏添加用户的对话框
      //   this.addDialogVisible = false
      //   this.getUsersList()
      // })
    },
    editUser() {
      this.setdialogVisible = false
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status != 200) {
        return this.$message.error('查询用户信息失败')
      }
      this.editForm = res.data
      this.setdialogVisible = true
    },
    setdialogClose() {
      this.$refs.editFormRef.resetFields()
    },
  },
}
</script>

<style >
.a {
  width: 0;
  height: 0;
  border: 100px solid red;
  border-color: transparent transparent red transparent;
}
.welcome {
  font-size: 30px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: wrap;
  white-space: pre-wrap;
}
.el-table {
  margin: 20px 0;
  font-size: 12px;
  border-radius: ;
  position: absolute;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-around;
}
</style>
