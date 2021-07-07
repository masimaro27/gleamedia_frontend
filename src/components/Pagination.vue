<template>
    <div class="pagination-block">
        <div v-if="!isFirstPageBlock" @click="prevPageBlock()" class="pagination-elem">prev</div>
        <div v-for="index in pageNums" 
            :key="index" 
            @click="goPage(index)"
            :class="{selected: index == paging.page}" 
            class="pagination-elem" >{{ index }}</div>
        <div v-if="!isLastPageBlock" class="pagination-elem" @click="nextPageBlock()">next</div>
    </div>
</template>

<script>
export default {
    props: ['paging'], 
    data() {
        return {
            pageBlock: 5,
            pageNums: [],
        }
    },
    watch: {
        currentPageBlock() {
            this.pageNums.splice(0);
            for(let i = this.startPage; i <= this.endPage; i++) {
                this.pageNums.push(i);
            }
        }
    },
    computed: {
        startPage() {
            return (this.currentPageBlock - 1) * this.pageBlock + 1
        },
        endPage() {
            const endPageNum = this.currentPageBlock * this.pageBlock;
            if (endPageNum > this.paging.totalPage) {
                return this.paging.totalPage;
            }
            return this.currentPageBlock * this.pageBlock;
        },
        currentPageBlock() {
            if (!this.paging.page) {
                return 0;
            }
            return Math.ceil(this.paging.page / this.pageBlock);
        },
        totalPageBlock() {
            return (Math.ceil(this.paging.count / this.paging.unit)) / this.pageBlock;
        },
        isLastPageBlock() {
            return this.currentPageBlock == this.totalPageBlock;
        },
        isFirstPageBlock() {
            return this.currentPageBlock == 1;
        }
        // isSelectedPage() {
        //     return this.page == 
        // }
    },
    methods: {
        goPage(index) {
            this.$emit('goPage', index)
        },
        nextPageBlock() {
            this.goPage(this.endPage + 1);
        },
        prevPageBlock() {
            this.goPage(this.startPage - 1);
        }
    }
}
</script>

<style>
    .pagination-block {
        display:flex;
        justify-content: center;
    }
    .pagination-elem {
        width: 2rem;
        height: 2rem;
        padding-top: 0.5rem;
        cursor: pointer;
    }

    .pagination-elem:active { 
        cursor: crosshair;
    }

    .pagination-elem.selected {
        font-weight: bold;
    }
</style>