<template>
    <div class="search-wrap shadow">
        <div class="left-wrap">
            <select v-model="selected">
                <option value="content">내용</option>
                <option value="status">상태</option>
                <option value="date">완료날짜</option>
            </select>
            <div class="content-wrap" v-if="selected == 'content'">
                <input type="text" v-model="search.content"/>
            </div>
            <div class="status-wrap" v-if="selected == 'status'">
                <select v-model="search.status">
                    <option value="INCOMPLETE">미완료</option>
                    <option value="COMPLETE">완료</option>
                </select>
            </div>
            <div class="date-wrap" v-if="selected == 'date'">
                <input type="date" v-model="search.completedStartDate"/>
                <input type="date" v-model="search.completedEndDate"/>
            </div>
        </div>
        <span class="btn-container" @click="searchTodo">
            <i class="search-btn fas fa-search" aria-hidden="true"></i>
       </span>
    </div>
</template>

<script>
    export default {
        components: {  },
        props: ['data'],
        data() {
            return {
                selected: 'content',
                search: {
                    status: '',
                    content: '',
                    completedStartDate: '',
                    completedEndDate:''
                }
            }
        },
        watch: {
            selected() {
                this.initSearchCondition();
            }
        },
        methods: {
            initSearchCondition() {
               this.search.status = '';
               this.search.content = '';
               this.search.completedStartDate = ''; 
               this.search.completedEndDate = '';
            },
            searchTodo() {
                if (this.selected == 'content') {
                    // if (!this.search.content) {
                    //     alert("검색할 내용을 입력해주세요.");
                    //     return;
                    // }
                    this.$emit('searchTodo', {'content': this.search.content})
                } else if (this.selected == 'status') {
                    if (!this.search.status) {
                        alert("검색할 상태를 선택해주세요.");
                        return;
                    }
                    this.$emit('searchTodo', {
                        'status': this.search.status
                    })
                } else {
                    if (this.search.completedStartDate == '') {
                        alert("검색시작날짜를 선택해주세요.");
                        return;
                    }
                    if (this.search.completedEndDate == '') {
                        alert("검색종료날짜를 선택해주세요.");
                        return;
                    }
                    if (this.search.completedStartDate > this.search.completedEndDate) {
                        alert("시작날짜는 종료날짜보다 이전이어야 합니다.");
                        return;
                    }
                    this.$emit('searchTodo', {
                        'completedStartDate': this.search.completedStartDate,
                        'completedEndDate': this.search.completedEndDate
                    })
                }
            }
        },
    }
</script>

<style scoped>
.search-wrap {
    display:flex;
    justify-content: space-between;
    background: white;
    height: 50px;
    line-height: 50px;
}
.search-wrap input {
    border-style: none; font-size: 0.9rem;
}
.search-wrap .left-wrap {
    display: flex;
}

.search-wrap .content-wrap input{
    width: 15rem;
    height: 3rem;
}

.search-wrap .status-wrap select {
    width: 15rem;
    height: 3rem;
    border-style: none
}

.search-wrap .date-wrap {
    display:flex;
    flex-direction: column;
}
.search-wrap .date-wrap input {
    width:15rem;
    height:50px;
}

.btn-container {background: linear-gradient(to right, #6478FB, #8763FB); width: 3rem; border-radius: 0 5px 5px 0;}
.btn-container .search-btn {color: white; vertical-align: middle;}
</style>