import { Component, OnInit } from '@angular/core';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { PublicationService } from 'src/app/services/publication.service';


@Component({
  //selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {

  dataChart: Object[];

  constructor(private publicationService: PublicationService) { 
  }

  ngOnInit(): void {
    let root = am5.Root.new("chartdiv");
    let data: Map<String, Object>[];
    let iniDate: Date = new Date('2022-11-16');
    let endDate: Date = new Date('2022-12-31');
    
  
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));

    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    this.publicationService.getDataChart(iniDate, endDate).subscribe(response => {data = response});

    // let data = [{
    //   "province": "A Coruña",
    //   "deportes": 2.5,
    //   "gastronomia": 2.5,
    //   "ocio": 2.1,
    //   "naturaleza": 1,
    //   "viajes": 0.8,
    //   "otros": 0.4
    // }, {
    //   "province": "Lugo",
    //   "deportes": 2.6,
    //   "gastronomia": 2.7,
    //   "ocio": 2.2,
    //   "naturaleza": 0.5,
    //   "viajes": 0.4,
    //   "otros": 0.3
    // }, {
    //   "province": "Ourense",
    //   "deportes": 2.8,
    //   "gastronomia": 2.9,
    //   "ocio": 2.4,
    //   "naturaleza": 0.3,
    //   "viajes": 0.9,
    //   "otros": 0.5
    // }, {
    //   "province": "Pontevedra",
    //   "deportes": 2.8,
    //   "gastronomia": 2.9,
    //   "ocio": 2.4,
    //   "naturaleza": 0.3,
    //   "viajes": 0.9,
    //   "otros": 0.5
    // }]

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "province",
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    xAxis.data.setAll(data);
    
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }));


    function makeSeries(name, fieldName) {
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        stacked: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: fieldName,
        categoryXField: "province"
      }));
    
      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}: {valueY}",
        tooltipY: am5.percent(10)
      });
      series.data.setAll(this.data);
    
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();
    
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true
          })
        });
      });
    
      legend.data.push(series);
    }
   
    
    makeSeries("Deportes", "deportes");
    makeSeries("Gastronnomía", "gastronomia");
    makeSeries("Ocio", "ocio");
    makeSeries("Naturaleza", "naturaleza");
    makeSeries("Viajes", "viajes");
    makeSeries("Otros", "otros");


    chart.appear(1000, 100);

    // this.dataChart.push = this.publicationService.getDataChart(new Date('2022-11-16'), new Date("2022-12-31"));

  }



}
