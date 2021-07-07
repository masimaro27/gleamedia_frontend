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
            <div class="ref-tag">
                <span>{{refIdxs}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['data'],
        data() {
            return {
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