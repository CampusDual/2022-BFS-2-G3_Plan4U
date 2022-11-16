import { Component, OnInit } from '@angular/core';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

@Component({
  //selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
    let root = am5.Root.new("chartdiv");
  
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

    let data = [{
      "year": "A Coruña",
      "deportes": 2.5,
      "gastronomia": 2.5,
      "ocio": 2.1,
      "naturaleza": 1,
      "viajes": 0.8,
      "otros": 0.4
    }, {
      "year": "Lugo",
      "europe": 2.6,
      "namerica": 2.7,
      "asia": 2.2,
      "lamerica": 0.5,
      "meast": 0.4,
      "africa": 0.3
    }, {
      "year": "Ourense",
      "europe": 2.8,
      "namerica": 2.9,
      "asia": 2.4,
      "lamerica": 0.3,
      "meast": 0.9,
      "africa": 0.5
    }, {
      "year": "Pontevedra",
      "europe": 2.8,
      "namerica": 2.9,
      "asia": 2.4,
      "lamerica": 0.3,
      "meast": 0.9,
      "africa": 0.5
    }, {
      "year": "A Coruña",
      "deportes": 2.5,
      "gastronomia": 2.5,
      "ocio": 2.1,
      "naturaleza": 1,
      "viajes": 0.8,
      "otros": 0.4
    }, {
      "year": "Lugo",
      "europe": 2.6,
      "namerica": 2.7,
      "asia": 2.2,
      "lamerica": 0.5,
      "meast": 0.4,
      "africa": 0.3
    }, {
      "year": "Ourense",
      "europe": 2.8,
      "namerica": 2.9,
      "asia": 2.4,
      "lamerica": 0.3,
      "meast": 0.9,
      "africa": 0.5
    }, {
      "year": "Pontevedra",
      "europe": 2.8,
      "namerica": 2.9,
      "asia": 2.4,
      "lamerica": 0.3,
      "meast": 0.9,
      "africa": 0.5
    }]

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "year",
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
        categoryXField: "year"
      }));
    
      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}: {valueY}",
        tooltipY: am5.percent(10)
      });
      series.data.setAll(data);
    
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

  }



}
