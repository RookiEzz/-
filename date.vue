<template>
 <div class="leave">
    <div @click="openTimePicker()">
        <mt-cell :title="title" is-link>{{timecache_display}}</mt-cell>
    </div>
    <div>
        <mt-datetime-picker
            ref="begin"
            @confirm='handleConfirm'
            v-model="timecache_select"
            year-format="{value}年"
            month-format="{value}月"
            date-format="{value}号" hour-format="{value}点" minute-format="{value}分">
        </mt-datetime-picker>
    </div>

 </div>
</template>

<script>
    import {
        Cell,
        DatetimePicker
    } from 'mint-ui';

    export default {
        props: ['title'],
        components: {
            mtCell: Cell,
            mtDatetimePicker: DatetimePicker
        },
        data() {
            return {
                type: '请选择',
                choose: '',
                begintime: '',
                endtime: '',
                timecache_select: '',
                timecache_display: ''
                
            }
        },
        methods: {
            
            openTimePicker() {
                console.log('111')
                this.$refs.begin.open();
            },
            handleConfirm () {
                this.timecache_display = this.timeFormat(this.timecache_select);
                this.$emit('postData', this.timecache_display);
            },
            timeFormat(d) {
                d = new Date(d)
                let year = d.getFullYear();
                let mon = d.getMonth() + 1;
                let day = d.getDate()
                let hour = d.getHours()
                let mini = d.getMinutes()

                if (mon < 10) {
                    mon = '0' + mon
                }
                if (day < 10) {
                    day = '0' + day
                }
                if (hour < 10) {
                    hour = '0' + hour
                }
                if (mini < 10) {
                    mini = '0' + mini
                }
                return d.getFullYear() + '-' + mon + '-' + day + ' ' + hour + ':' + mini

            }
        },
        created () {
            this.timecache_display = this.timeFormat(new Date());
            this.timecache_select = this.timeFormat(new Date());
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mint-popup {
        width: 100%;
    }
    
    .picker-close {
        overflow: hidden;
    }
    
    .picker-close span {
        margin: 10px;
    }
    
    .fl {
        float: left;
    }
    
    .fr {
        float: right;
    }
</style>