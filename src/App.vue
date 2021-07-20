<template>
  <div id="app">
    <div>
      <a-transfer
          class="tree-transfer"
          :data-source="dataSource"
          :target-keys="targetKeys"
          :render="item => item.title"
          @change="onChange"
          :list-style="{
                   width: '300px',
                   height: '30px',}"

      >
        <template
            slot="children"
            slot-scope="{ props: { direction, selectedKeys }, on: { itemSelectAll } }"
        >
          <!--             滚动条在 a-tree里配置    style="height:270px;width:320px;overflow-y:auto"-->
          <a-tree
              v-if="direction === 'left'"
              v-model="checkedKeys"
              checkable
              :treeData="treeData"
              @check="
            () => {
              onChecked( itemSelectAll);
            }"
              />
        </template>
      </a-transfer>
    </div>

  </div>
</template>

<script>
const treeData = [
  {key: '100', title: '一号线',children: []},
  {
    key: '200',
    title: '二号线',
    children: [
      {key: '二号线,1234', title: '北土城'},
      {key: '二号线,4567', title: '西土城'},
    ],
  },
  {
    key: '300', title: '三号线', children: [
      {key: '三号线,4564', title: '健德门'},
      {key: '三号线,5675', title: '北京站'},
    ]
  },
];
const tree2Data = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];
const transferDataSource = [];
function flatten(list = []) {
  list.forEach(item => {
    transferDataSource.push(item);
    flatten(item.children);
  });
}
flatten(JSON.parse(JSON.stringify(treeData)));

export default {
  name: 'App',
  data() {
    return {
      targetKeys: [],
      dataSource: transferDataSource,
      indeterminate: true,
      checkAll: false,
      optionsList: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      tree2Data,
      checkedKeysOld:[]
    }
  },
  watch: {
    checkedKeys(val) {
      this.checkedKeysOld = this.checkedKeys
      this.checkedKeys = val
    },
  },
  computed: {
    treeData() {
      return treeData
    },
  },
  methods: {
    onChange(targetKeys) {
      targetKeys = this.unique(targetKeys)
      for (let i in targetKeys){
        //查找是否有线路
        if(targetKeys[i].split(",").length===1){
          //判断是否有此线路全部站点
          this.treeData.some(item=>{
            if(item.key===targetKeys[i]){
              //找到线路全部站点，判断是所选否拥有全部
              for(let k in item.children){
                if(targetKeys.indexOf(item.children[k].key)===-1){
                  //没有拥有全部
                  // 去掉线路
                  targetKeys.splice(targetKeys.indexOf(item.key),1);
                }
              }
            }
          })
        }
      }
      this.targetKeys = targetKeys;
      this.checkedKeys = []
      for (let i in this.targetKeys){
        this.checkedKeys.push(this.targetKeys[i].toString())
      }
      console.log("this.targetKeys:"+this.targetKeys)
    },
    onChecked(itemSelectAll) {
      //计数
        itemSelectAll(this.checkedKeysOld,false)
        itemSelectAll(this.checkedKeys,true)
    },
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr) && res.set(arr, 1));
    },
  },
}
</script>
<style scoped>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
#components-affix-demo-target.scrollable-container {
  height: 100px;
  overflow-y: scroll;
}
#components-affix-demo-target .background {
  padding-top: 60px;
  height: 300px;
  background-image: url('https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg');
}
.ant-select-selection--multiple::-webkit-scrollbar,
.ant-select-dropdown::-webkit-scrollbar {
  /*滚动条整体样式*/
  height: 5px;
}
.ant-select-selection--multiple::-webkit-scrollbar-thumb,
.ant-select-dropdown::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: lightskyblue;
}
.ant-select-selection--multiple::-webkit-scrollbar-track,
.ant-select-dropdown::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #ededed;
}

</style>