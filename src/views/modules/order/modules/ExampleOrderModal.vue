<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row>

          <a-col :span="12">
            <a-form-item
              label="订单编码"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                v-decorator="[ 'orderCode', validatorRules.orderCode]"
                placeholder="请输入订单编码"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="下单时间"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <j-date
                placeholder="请选择下单时间"
                v-decorator="[ 'orderTime', validatorRules.orderTime]"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="订单描述"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                v-decorator="[ 'orderDesc', validatorRules.orderDesc]"
                placeholder="请输入订单描述"
              ></a-input>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>

      <!-- 子表单区域 -->
      <a-tabs
        v-model="activeKey"
        @change="handleChangeTabs"
      >
        <a-tab-pane
          tab="例子订单明细"
          :key="refKeys[0]"
          :forceRender="true"
        >
          <j-editable-table
            :ref="refKeys[0]"
            :loading="exampleOrderItemTable.loading"
            :columns="exampleOrderItemTable.columns"
            :dataSource="exampleOrderItemTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true"
          />
        </a-tab-pane>

      </a-tabs>

    </a-spin>
  </a-modal>
</template>

<script>

import pick from 'lodash.pick'
import { FormTypes, getRefPromise } from '@/utils/JEditableTableUtil'
import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
import JDate from '@/components/jeecg/JDate'

export default {
  name: 'ExampleOrderModal',
  mixins: [JEditableTableMixin],
  components: {
    JDate
  },
  data () {
    return {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16
      },
      labelCol2: {
        span: 3
      },
      wrapperCol2: {
        span: 20
      },
      // 新增时子表默认添加几行空数据
      addDefaultRowNum: 1,
      validatorRules: {
        orderCode: {},
        orderTime: {},
        orderDesc: {}
      },
      refKeys: ['exampleOrderItem'],
      tableKeys: ['exampleOrderItem'],
      activeKey: 'exampleOrderItem',
      // 例子订单明细
      exampleOrderItemTable: {
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '订单外键ID',
            key: 'orderFkId',
            type: FormTypes.input,
            width: '200px',
            placeholder: '请输入#{title}',
            defaultValue: ''
          },
          {
            title: '数量',
            key: 'num',
            type: FormTypes.input,
            width: '200px',
            placeholder: '请输入#{title}',
            defaultValue: ''
          },
          {
            title: '价格',
            key: 'price',
            type: FormTypes.input,
            width: '200px',
            placeholder: '请输入#{title}',
            defaultValue: ''
          }
        ]
      },
      url: {
        add: '/order/exampleOrder/add',
        edit: '/order/exampleOrder/edit',
        exampleOrderItem: {
          list: '/order/exampleOrder/queryExampleOrderItemByMainId'
        }
      }
    }
  },
  methods: {
    getAllTable () {
      const values = this.tableKeys.map(key => getRefPromise(this, key))
      return Promise.all(values)
    },
    /** 调用完edit()方法之后会自动调用此方法 */
    editAfter () {
      const fieldval = pick(this.model, 'orderCode', 'orderTime', 'orderDesc')
      this.$nextTick(() => {
        this.form.setFieldsValue(fieldval)
      })
      // 加载子表数据
      if (this.model.id) {
        const params = { id: this.model.id }
        this.requestSubTableData(this.url.exampleOrderItem.list, params, this.exampleOrderItemTable)
      }
    },
    /** 整理成formData */
    classifyIntoFormData (allValues) {
      const main = Object.assign(this.model, allValues.formValue)

      return {
        ...main, // 展开
        exampleOrderItemList: allValues.tablesValue[0].values
      }
    },
    validateError (msg) {
      this.$message.error(msg)
    },
    popupCallback (row) {
      this.form.setFieldsValue(pick(row, 'orderCode', 'orderTime', 'orderDesc'))
    }

  }
}
</script>

<style scoped>
</style>
