import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Select,
  Option,
  Autocomplete,
  Message,
  Main,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Loading,
  Tag,
  Cascader,
  Alert,
  Upload,
  DatePicker
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Autocomplete)
Vue.use(Main)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Loading)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(DatePicker)
// 全局注册提示框
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm