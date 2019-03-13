<template>

  <div class="container-fluid">
    <!--bread crumb-->
    <div class="row page-titles">
      <div class="col-md-5 col-8 align-self-center">
        <h3 class="text-themecolor m-b-0 m-t-0">Analysis Page</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a>Home</a></li>
          <li class="breadcrumb-item active">Analysis Page</li>
        </ol>
      </div>
    </div>

    <!--</div>-->
    <div class="row">
      <!-- Column -->
      <!-- 柱状图 -->
      <div class="col-lg-12 col-md-7">
        <div class="card">
          <div class="card-block">
            <div class="row">
              <div class="col-12">
                <div class="d-flex flex-wrap">
                  <div>
                    <h3 class="card-title">Sales Overview</h3>
                    <h6 class="card-subtitle">Ample Admin Vs Pixel Admin</h6></div>
                  <div class="ml-auto">
                    <ul class="list-inline">
                      <li>
                        <h6 class="text-muted text-success"><i class="fa fa-circle font-10 m-r-10 "></i>salary</h6></li>
                      <li>
                        <h6 class="text-muted  text-info"><i class="fa fa-circle font-10 m-r-10"></i>employed</h6></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div id="first" class="amp-pxl" style="height: 360px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Row -->

    <!-- Row -->
    <div class="row">

      <!-- 折线图 -->
      <div class="col-lg-8 col-md-5">
        <div class="card">
          <div class="card-block">
            <h3 class="card-title">Our Visitors </h3>
            <h6 class="card-subtitle">Different Devices Used to Visit</h6>
            <div id="degree" style="height:290px; width:100%;"></div>
          </div>
          <div>
            <hr class="m-t-0 m-b-0">
          </div>
          <div class="card-block text-center ">

          </div>
        </div>
      </div>

      <!-- 饼状图 -->
      <div class="col-lg-4 col-md-5">
        <div class="card">
          <div class="card-block">
            <h3 class="card-title">Our Visitors </h3>
            <h6 class="card-subtitle">Different Devices Used to Visit</h6>
            <div id="visitor" style="height:290px; width:100%;"></div>
          </div>
          <div>
            <hr class="m-t-0 m-b-0">
          </div>
          <div class="card-block text-center ">
          </div>
        </div>
      </div>


    </div>
    <!-- Row -->

  </div>


</template>

<script>
  // import * as types from '../store/types'
  // import ChinaMap from '../components/ChinaMap'

  export default {
    name: 'analysisPage',

    mounted () {
      'use strict'

      /**
       * get data from backend
       * @type {Chartist.Bar.Bar|Chartist.Bar.Bar|Chartist.Bar.Bar|*}
       */

      let returnData = [

        //employedNumbers
        {
          'jobs': [
            'firstJob',
            'secondJob',
            'thirdJob',
          ],
          'employedNumbers': [
            '1800',
            '1050',
            '6600',
          ]
        },

        //salary
        {
          'jobs': [
            'firstJob',
            'secondJob',
            'thirdJob',
          ],
          'salary': [
            '1000',
            '5045',
            '66544',
          ]
        },

        //locationInformation
        {
          'locations': [
            '重庆',
            '北京',
            '成都',
            '西藏',
            '台湾',
          ],
          'locationNumber': [
            '655',
            '9635',
            '8888',
            '898',
            '5888',

          ]
        },

        //degree
        {
          'degree':[
            '博士',
            '硕士',
            '本科',
            '高中',
            '中专',
            '初中',
            '无',
          ],
          'numbers':[
            '777',
            '666',
            '888',
            '444',
            '333',
            '222',
            '111',
          ]
        }

      ]

      let jobs = []
      let employedNumbers = []
      let salary = []
      for (let i = 0; i < returnData[0].jobs.length; i++) {
        jobs.push(returnData[0].jobs[i])
        employedNumbers.push(returnData[0].employedNumbers[i])
        salary.push(returnData[1].salary[i])
      }

      let locations = []
      let locationNumber = []
      for (let i = 0; i < returnData[2].locations.length; i++) {
        locations.push(returnData[2].locations[i])
        locationNumber.push(returnData[2].locationNumber[i])
      }

      // ==============================================================
      // Sales overview
      // 柱状图
      // ==============================================================
      var chart2 = new Chartist.Bar('#first', {
        labels: jobs,
        series: [
          employedNumbers,
          salary,
        ]
      }, {
        axisX: {
          // On the x-axis start means top and end means bottom
          position: 'end',
          showGrid: true
        },
        axisY: {
          // On the y-axis start means left and end means right
          position: 'start'
        },
        high: '10000',
        low: '0',
        plugins: [
          Chartist.plugins.tooltip()
        ]
      })

      var chart = [chart2]

      // ==============================================================
      // This is for the animation
      // 柱状图动画
      // ==============================================================

      for (var i = 0; i < chart.length; i++) {
        chart[i].on('draw', function (data) {
          if (data.type === 'line' || data.type === 'area') {
            data.element.animate({
              d: {
                begin: 500 * data.index,
                dur: 500,
                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeInOutElastic
              }
            })
          }
          if (data.type === 'bar') {
            data.element.animate({
              y2: {
                dur: 500,
                from: data.y1,
                to: data.y2,
                easing: Chartist.Svg.Easing.easeInOutElastic
              },
              opacity: {
                dur: 500,
                from: 0,
                to: 1,
                easing: Chartist.Svg.Easing.easeInOutElastic
              }
            })
          }
        })
      }

      // ==============================================================
      // Our visitor
      // 饼状图
      // ==============================================================

      let percentage = []
      for (let i = 0; i < locations.length; i++) {
        let temp = []
        temp.push(locations[i])
        temp.push(locationNumber[i])
        percentage.push(temp)
      }

      var chart = c3.generate({
        bindto: '#visitor',
        data: {
          columns: percentage,

          type: 'donut',
          onclick: function (d, i) {
            // console.log('onclick', d, i)
          },
          onmouseover: function (d, i) {
            // console.log('onmouseover', d, i)
          },
          onmouseout: function (d, i) {
            // console.log('onmouseout', d, i)
          },
        },
        donut: {
          label: {
            show: false
          },
          title: 'Our visitor',
          width: 20,

        },

        legend: {
          hide: true
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        color: {
          pattern: ['#eceff1', '#745af2', '#26c6da', '#1e88e5', '#E0FFFF', '#B9D3EE', '#7B68EE', '#63B8FF', '#00868B',
            '#eceff1', '#745af2', '#26c6da', '#1e88e5', '#E0FFFF', '#B9D3EE', '#7B68EE', '#63B8FF', '#00868B',
            '#eceff1', '#745af2', '#26c6da', '#1e88e5', '#E0FFFF', '#B9D3EE', '#7B68EE', '#63B8FF', '#00868B',
            '#eceff1', '#745af2', '#26c6da', '#1e88e5', '#E0FFFF', '#B9D3EE', '#7B68EE', '#63B8FF', '#00868B',]
        }
      })
      /**
       * 学历要求折线图
       *
       */
      let degree = [];
      let degreeNumber = [];
      for (let i = 0; i < returnData[3].degree.length; i++) {
        degree.push(returnData[3].degree[i]);
        degreeNumber.push(returnData[3].numbers[i]);
      }

      // let series = [];
      // for (let i = 0; i < degree.length; i++) {
      //
      // }


      var chart = new Chartist.Line('#degree', {
        labels: degree,
        series: [
          degreeNumber,
        ]
      }, {
        showPoint: true,
        axisX: {
          // On the x-axis start means top and end means bottom
          position: 'end',
          showGrid: true,
          // offset: 0,
        },
        axisY: {
          // On the y-axis start means left and end means right
          // offset: 0,
          position: 'start'
        },
        high: '1000',
        low: '0',
        plugins: [
          // ctPointLabels({
          //   textAnchor: 'middle',
          // }),
          Chartist.plugins.tooltip({
            tooltipOffset:{
              x:-10,
              y:80,
            },
          })
        ]
      })

    }
  }


</script>

<style scoped>

</style>
