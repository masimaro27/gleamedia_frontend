<template>
    <div>
        <div class="content-wrap shadow">
            <input class="checkBtn" @click="toggle(data)" type="checkbox" :checked="data.completed" />
            <div class="middle-wrap">
                <div class="content" :class="{completed:data.completed}">{{ data.content }}</div>
                <div class="date">{{ data.createdAt }}</div>
                <div class="date">{{ data.updatedAt }}</div>
            </div>
            <div class="right-wrap">
                <span class="removeBtn" type="button" @click="removeTodo(data.idx)">
                    <i class="fa fa-trash-o" aria-hidden="true" />
                </span>
            </div>
        </div>
        <div class="content-bottom-wrap">
            <span class="ref-span">tag</span>
            <div class="ref-tag" v-if="!showAddTagBox || !showDelTagBox">
                <span>{{refIdxs}}</span>
            </div>
            <div class="ref-tag" v-if="showAddTagBox">
                <input type="text" v-model="addTagIdx" />
            </div>
            <div class="ref-tag" v-if="showDelTagBox">
                <input type="text" v-model="delTagIdx" />
            </div>
            <input v-if="!showAddTagBox && !showDelTagBox" type="button" @click="addTagBox()" value="태그추가"/>
            <input v-if="showAddTagBox" type="button" @click="addTag(data.idx)" value="저장1"/>
            <input v-if="!showDelTagBox && !showAddTagBox" type="button" @click="delTagBox()" value="태그삭제"/>
            <input v-if="showDelTagBox" type="button" @click="delTag(data.idx)" value="저장2"/>
            <div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['data'],
        data() {
            return {
               showAddTagBox: false, 
               showDelTagBox: false,
               addTagIdx: '',
               delTagIdx: '',
            }
        },
        computed: {
            refIdxs() {
                let item;
                if (this.data.emptyRef) {
                    return '-'
                }
                return this.$_
                            .chain(this.data.ref)
                            .map(item => "@" + item.idx)
                            .join(item, ', ');
            }
        },
        methods: {
            addTagBox() {
                this.showAddTagBox = !this.showAddTagBox;
            },
            delTagBox() {
                this.showDelTagBox = !this.showDelTagBox;
            },
            addTag(idx) {
                if (!this.addTagIdx) {
                    alert('추가할 태그번호를 입력하세요.');
                    return;
                }
            
                const obj = {
                    'idx': idx,
                    'addIdx': this.$_.split(this.addTagIdx, ',')
                }
                this.$emit('addTag', obj);
                this.showAddTagBox = !this.showAddTagBox;
            },
            delTag(idx) {
                const obj = {
                    'idx': idx,
                    'delIdx': this.$_.split(this.delTagIdx, ',')
                }
                if (!this.delTagIdx) {
                    alert('삭제할 태그번호를 입력하세요.');
                    return;
                }
                this.$emit('delTag', obj);
                this.showDelTagBox = !this.showDelTagBox;
            },
            toggle(data) {
                data.completed = !data.completed
                if (data.completed) {
                    data.status = 'COMPLETE';
                } else {
                    data.status = 'INCOMPLETE';
                }
                this.updateTodoStatus(data);
            },
            updateTodoStatus(data) {
                this.$axios.put('http://localhost:8081/api/todo/status/' + data.idx, {
                    status: data.status
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                )
                .then((res) => {
                    data.updatedAt = res.data.updatedAt;
                })
                .catch(err => {
                    this.toggle(data);
                    alert(err.response.data.message);
                });
            },
            removeTodo(todoIdx) {
                this.$emit('removeTodo', todoIdx);
            }
    
        }

        
    }
</script>

<style scoped>
    .content-wrap {
        display: flex;
        align-items: center;
        height: 5rem;
    }
    .middle-wrap {
        width: 80%;
        display: flex;
        align-items: center;
    }
    .middle-wrap .content {
        width: 50%;
    }
    .middle-wrap .date {
        font-size: small;
        width: 25%;
    }
    .middle-wrap .content.completed {
        text-decoration-line: line-through;
    }

    .right-wrap {
        margin-left: 7px;
    }
    .content-bottom-wrap {
        height: auto;
        width: 100%;
        display: flex;
    }
    .content-bottom-wrap .ref-tag{
        width: 80%;
    }
    .content-bottom-wrap .ref-span{
        width: 10%;
    }

    .checkBtn {
        line-height: 45px;
        color: #62acde;
        margin-right: 5px;
        width: 10%;
    }

    .removeBtn {
        margin-left: auto;
        color: #de4343;
        width: 10%;
    }
</style>