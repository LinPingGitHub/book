export default function (refValue) {
    return {
        mounted() {
            this.$bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].addEventListener("scroll", this.handleMainScroll);//监听主区域滚动条的变化
        },
        beforeDestroy() {
            this.$bus.$emit("mainScroll");
            this.$bus.$off("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll);//取消监听主区域滚动条的变化
        },
        methods: {
            handleSetMainScroll(scrollTop) {
                this.$refs[refValue].scrollTop = scrollTop;
            },
            handleMainScroll() {
                // console.log('滚动条变化了');
                this.$bus.$emit("mainScroll", this.$refs[refValue]);
            },
        }
    }
}