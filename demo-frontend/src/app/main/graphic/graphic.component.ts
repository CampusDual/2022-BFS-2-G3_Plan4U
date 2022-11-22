import { Component, OnInit } from '@angular/core';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { PublicationService } from 'src/app/services/publication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";


@Component({
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {

  graphicForm: FormGroup;
  dataChart: Object[];
  data: Map<String, Object>[];
  root: any
  chart: any
  iniDate: Date = new Date();
  endDate: Date = new Date('2023-12-31');


  constructor(
    private publicationService: PublicationService,
    private fb: FormBuilder
  ) {
    this.graphicForm = this.fb.group({
      iniDate: [''],
      endDate: ['']
    })
  }

  ngOnInit(): void {
    this.root = am5.Root.new("chartdiv");
    this.publicationService.getDataChart(this.iniDate, this.endDate).subscribe((response) => {
      this.data = response
      this.drawGraphic(this.root);
      
    });

  }

  drawGraphic(root) {
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    this.chart = this.root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {})
    });

    this.chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    let xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "province",
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));

    xAxis.data.setAll(this.data);

    let yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    let legend = this.chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }));


    function makeSeries(name, fieldName, data, root , chart, color) {
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        stacked: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: fieldName,
        categoryXField: "province"
      }));

      series.set("fill" , am5.color(color))
      series.set("stroke" , am5.color(color))
      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}: {valueY}",
        tooltipY: am5.percent(10)
      });
      series.data.setAll(data);
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
    makeSeries("Deportes", "Deportes", this.data, this.root, this.chart, 0x264653);
    makeSeries("Gastronomía", "Gastronomía", this.data, this.root, this.chart, 0x2a9d8f);
    makeSeries("Ocio", "Ocio", this.data, this.root, this.chart, 0xe9c46a);
    makeSeries("Juegos", "Juegos", this.data, this.root, this.chart, 0xf4a261);
    makeSeries("Naturaleza", "Naturaleza", this.data, this.root, this.chart, 0xe76f51);
    makeSeries("Viajes", "Viajes", this.data, this.root, this.chart, 0x457b9d);
    makeSeries("Otros", "Otros", this.data, this.root, this.chart , 0xbc6c25);

    this.chart.appear(1000, 100);

  }

  filter() {
    this.publicationService.getDataChart(this.graphicForm.value.iniDate, this.graphicForm.value.endDate).subscribe((response) => {
    this.data = response
    this.chart.dispose()
    this.drawGraphic(this.root)
    })
  }
}