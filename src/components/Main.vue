<template>
      <div class="wrapper">
        <div class="mo-sport">
          <div class="container">
            <div class="row">
              <div class="col-md-7">
                <div class="mo-sport__heading-area">
                      <h1>Спорт расписание</h1>
                </div>
                <p>"Однако наш текст не терял надежды найти свою подругу Lora Ipsum. Он написал письмо на передачу "Найди меня", а через неделю уже сидел в студии</p>
                <a href="#" class="btn-mo red" v-on:click="modalOn">
                  <span class="btn__text">Добавить</span>
                  <span class="btn__icon icon__red"> </span>
                </a>
              </div>
              <div class="col-md-5">
                <div class="modal-dialog" v-bind:class="{ active: modal }">
                  <div class="modal-content">
                    <div class="modal-header text-center">
                      <h4 class="modal-title w-100 font-weight-bold">Модальное</h4>
                      <button type="button" class="close" v-on:click="modalOff">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body mx-3">
                      <div class="md-form mt-3 mb-4">
                        <input type="text" placeholder="Название" class="form-control" v-model="name">
                      </div>
                      <div class="md-form mb-4">
                        <b-form-input id="type-time" type="time" placeholder="Время" v-model="time"></b-form-input>
                      </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                      <button class="btn red" v-on:click="addItemForm">Добавить <i class="fa fa-paper-plane-o ml-1"></i></button>
                      <button class="btn" v-on:click="modalOff">Отмена <i class="fa fa-paper-plane-o ml-1"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-page">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="form-check mo-check" v-for="(item, index) in items" v-bind:key="index">
                  <input class="form-check-input" type="checkbox" value="" v-bind:id="'defaultCheck' + index" v-model="item.check">
                  <label class="form-check-label" v-bind:for="'defaultCheck' + index">
                      <span class="check-time">{{ item.time }}</span>
                      {{ item.name }}
                      <button type="button" class="check-close" v-on:click="removeItem(index)">
                          <span>&times;</span>
                      </button>
                  </label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="drop_panel">
                  <div class="timeline" v-bind:class="{ active: checkedItems }">
                    <div class="time" v-for="(time, index) in times" v-bind:key="index" v-bind:class="{ selected: activeTime(index) }" v-on:click="selectTime(index)">
                          {{ time }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'

var sortByTime = function (d1, d2) {
  if (d1.time < d2.time) {
    return -1
  } else {
    return 1
  }
}
var isChecked = function (d) {
  return d.check
}

const URLgetItemAPI = 'https://private-anon-7147503c9e-test17563.apiary-mock.com/events'
const URLupdateItemAPI = 'https://private-anon-7147503c9e-test17563.apiary-mock.com/events/1'
const URLdeleteItemAPI = 'https://private-anon-7147503c9e-test17563.apiary-mock.com/events/1'

export default {
  name: 'Main',
  data () {
    return {
      axiosGetItems: [],  // список, полученный с сервера
      axiosError: [],     // ошибки при обращении к серверу
      axiosDate: '',      // дата, выделенная из списка
      modal: false,       // признак активности модальной формы
      time: '',           // время - поле ввода мод.формы
      name: '',           // текст - поле ввода мод.формы
      items: [],          // список для визуализации
      indexItems: 0,      // индекс для уникальности элементов списка
      times: [ '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30' ],
      selectTimeItem: -1  //индекс выбранного времени
    }
  },
  computed: {
    checkedItems: function () {   // проверка, есть ли в списке хотя бы один выбранный      
      return this.items.some(isChecked)
    }
  },
  mounted () {
    this.getItemAPI()
  },
  methods: {
    // API удаление
    delItemAPI: function (item) {
      var lDate = this.axiosDate + 'T' + item.time + ':00Z'
      var lTitle = item.name
      var axiosItem = []
      axiosItem.push({
        date: lDate,
        title: lTitle
      })
      axios.delete(URLdeleteItemAPI, axiosItem)
        .then(response => {
        })
        .catch(error => {
          this.axiosError.push(error)
        })
    },
    // API обновление
    updateItemAPI: function (itemUpdate) {
      var axiosItem = []
      var lDate, lTitle
      lDate = this.axiosDate + 'T' + itemUpdate[0].time + ':00Z'
      lTitle = itemUpdate[0].name
      axiosItem.push( {date: lDate, title: lTitle} )
      axios.put(URLupdateItemAPI, axiosItem)
        .then(response => {
        })
        .catch(error => {
          this.axiosError.push(error)
        })
    },
    // API список
    getItemAPI: function () {
      axios.get(URLgetItemAPI)
        .then(response => {
          this.axiosGetItems = response.data
          this.copyAxiosToItems()
        })
        .catch(error => {
          this.axiosError.push(error)
        })
    },
    // преобразование списка с сервера в список для показа 
    copyAxiosToItems: function () {
      var dt = this.axiosGetItems[0].date
      this.axiosDate = dt.substr(0, 10)
      if (this.axiosGetItems.length > 0) {
        var lId, lTitle, lDate, lTime, item
        for (var i = 0; i < this.axiosGetItems.length; i++) {
          lId = this.indexItems++
          lTitle = this.axiosGetItems[i].title
          lDate = this.axiosGetItems[i].date
          lTime = lDate.substr(11, 5)
          item = {
            id: lId,
            time: lTime,
            name: lTitle,
            check: false
          }
          this.items.push(item)
        }
        this.items.sort(sortByTime)
      }
    },
    // добавление в список введенных значений в модалной форме
    addItemForm: function () {
      if (this.name === '') {
        alert('Нужно заполнить все поля')
        return
      }
      if (this.time === '') {
        alert('Нужно заполнить все поля')
        return
      }
      var id = this.indexItems++
      var item = {
        id: id,
        time: this.time,
        name: this.name,
        check: false
      }
      this.items.push(item)
      this.items.sort(sortByTime)
      this.time = ''
      this.name = ''
    },
    // удаление из списка
    removeItem: function (index) {
      var item = this.items[index]
      this.items.splice(index, 1)
      this.delItemAPI(item)
    },
    // показать модальную форму
    modalOn: function () {
      this.modal = true
    },
    // скрыть модальную форму
    modalOff: function () {
      this.modal = false
    },
    activeTime: function (index) {
      var ok = this.checkedItems
      if (!ok) { return ok }
      return (index === this.selectTimeItem)
    },
    // замена в списке времени
    selectTime: function (index) {
      var lItems = []
      this.selectTimeItem = index
      this.items.forEach(function (curItem) {
        if (curItem.check === true) {
          curItem.time = this.times[index]
          lItems.push({
            id: curItem.id,
            time: curItem.time,
            name: curItem.name,
            check: curItem.check
          })
        }
      }, this)
      this.items.sort(sortByTime)
      this.updateItemAPI(lItems)
    }
  }
}
</script>

<style scoped  lang="scss">
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';

ul, li {
    display: block;
    padding: 0;
    margin: 0;
}

a:hover {
    text-decoration: none;
}

.red {
    background: #f44029;
    color: #fff;
}

.icon__red {
    background: #ff513b;
}

.mo-sport {
    background: #fdb62d;
    padding: 5.5rem 0 0;
    position: relative;
}

.mo-sport h1 {
    color: #fff;
    padding: 0 0 1.25rem;
    font-size: 4.0625rem;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
}

.mo-sport p {
    font-size: 1rem;
    color: #fff;
    margin: 0 0 2.25rem;
}

.mo-sport__heading-area {
    margin: 0 0 2.25rem;
    position: relative;
}

.mo-sport__heading-area:before {
    content: "";
    position: absolute;
    top: 105%;
    left: 0;
    display: block;
    width: 100px;
    height: 1px;
    background: #fff;
}

.mo-sport__heading-area:after {
    content: "";
    position: absolute;
    top: 98.5%;
    left: 0;
    display: block;
    width: 300px;
    height: 3px;
    background: #fff;
}

.mo-sport__image {
    max-width: 100%;
}

.btn-mo {
    display: inline-block;
    width: 190px;
    height: 44px;
    line-height: 44px;
    position: relative;
    transition: all 0.4s ease-in-out;
    text-align: center;
    border-radius: 22px;
    margin-bottom: 100px;
}

.btn__text {
    color: #fff;
    z-index: 3;
    position: relative;
    text-transform: uppercase;
    font-size: 1rem;
}

.btn__icon {
    width: 32px;
    height: 32px;
    position: absolute;
    right: 6px;
    top: 6px;
    border-radius: 50%;
    transition: all 0.4s ease-in-out;
    z-index: 2;
}

.btn-mo:hover .btn__icon {
    width: calc(100% - 12px);
    text-align: left;
    border-radius: 30px;

}

.main-page {
    padding: 2rem 0 3.75rem;
}

.mo-form {
    font-size: 1rem;
    line-height: 30px;
}

.mo-check {
    display: block;
    margin: 0.625rem 0;
    position: relative;
}

.mo-check label {
    padding: 0.75rem 1.875rem;
    display: block;
    text-align: left;
    color: #3C454C;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: color 0.4ms ease-in;
    /* overflow: hidden; */
    margin-left: 1.25rem;
    background-color: #fff;
    box-shadow: 0 4px 12px -1px rgba(18, 22, 33, 0.1);
    border-radius: 6px;
}

.mo-check input {
    width: 28px;
    height: 28px;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    cursor: pointer;
    margin: 0;
    visibility: hidden;
}

.mo-check label:after {
    width: 28px;
    height: 28px;
    content: '';
    position: absolute;
    z-index: 2;
    border-radius: 50%;
    border: 2px solid #d1d7dc;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.2s ease-in;
    left: -45px;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");

}

.mo-check input:checked ~ label:after {
    background-color: rgb(244, 64, 41);
    border-color: rgb(244, 64, 41);
}

.check-close {
    position: absolute;
    right: 0;
    top: 0;
    padding: .75rem 1.25rem;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
    cursor: pointer;
}

.check-close span {
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    font-size: 1.5rem;
    opacity: 0.5;
}

.check-close:hover span {
    opacity: 1;
    color: rgb(244, 64, 41);
}

.modal-dialog {
    max-width: 380px;
    display: none;
    margin: 0 auto;
}

.modal-dialog.active {
    display: block;
}

.modal-dialog.active + .mo-sport__image {
    display: none;
}

.modal-dialog .modal-content {
    box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    border: 0;
    border-radius: .125rem;
}

.drop_panel {
    position: relative;
}

.timeline {
    text-align: left;
    width: 320px;
    background-color: white;
    padding: 20px;
    margin: 0 auto;
    opacity: 0.5;
}

.timeline.active {
    opacity: 1;
}

.time {
    border: 1px solid #d9d9d9;
    display: inline-block;
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.time.selected {
    background-color: gray;
    color: white;
    cursor: pointer;
}
</style>
