<template>
    <div>
        <todo-item v-for="todoItem in data" :key="todoItem.idx" :data="todoItem" 
            @removeTodo="removeTodo"
            @addTag="addTag"
            @delTag="delTag"
            />
    </div>
</template>

<script>
    import TodoItem from './TodoItem.vue';
    export default {
        components: { TodoItem },
        props: ['data'],
        data() {
            return {

            }
        },
        methods: {
            removeTodo(todoIdx) {
                // this.$emit('removeTodo', todoItem, index);
                this.$emit('removeTodo', todoIdx);
            },
            addTag(idxList) {
                this.$emit('addTag', idxList);
            },
            delTag(idxList) {
                this.$emit('delTag', idxList);
            }

        },
    }
</script>

<style scoped>
</style>