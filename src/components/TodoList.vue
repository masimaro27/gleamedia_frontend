<template>
    <div>
        <todo-item v-for="todoItem in data" :key="todoItem.idx" :data="todoItem" @removeTodo="removeTodo"/>
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
            }
        },
    }
</script>

<style scoped>
</style>