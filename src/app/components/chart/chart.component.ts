import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  template: `
    <div>
      <canvas #canvas></canvas>
    </div>
  `,
  styles: []
})
export class ChartComponent implements OnInit {
  @Input() data: number[][];
  @Input() labels: string[];
  @Input() options: ChartOptions;
  @Input() type: string;

  @ViewChild('canvas') canvasRef: ElementRef;

  chart: Chart;

  constructor() {}

  ngOnInit() {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type,
      data: {
        labels: this.labels,
        datasets: this.data.map((dataset, i) => ({
          label: `Dataset ${i}`,
          data: dataset,
          fill: false,
          borderColor: `hsl(${i * 40}, 70%, 50%)`
        }))
      },
      options: this.options
    });
  }
}
