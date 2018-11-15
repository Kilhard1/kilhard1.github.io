var app = new Vue({
  el: "#app",
  data: {
		newItem: '',
		items: []
  },
	methods: {
		addItem: function() {
console.log("addItem");
            var n = this.items.length;
			var item = {
                time: "11:00",
                name: "Беги, Форест, беги " + n
            }
			this.items.push(item);
		},
		removeItem: function(index) {
            this.items.splice(index,1);
		},
		clearList: function() {
			this.items = [];
		}
	}
});

