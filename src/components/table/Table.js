import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  toHTML() {
    return `
    <div class="excel__table-row">
        <div class="excel__table-row-info"></div> 
        <div class="excel__table-row-data">
            <div class="excel__table-row-data-column">
                A
            </div>
            <div class="excel__table-row-data-column">
                B
            </div>
            <div class="excel__table-row-data-column">
                C
            </div>
        </div>
    </div> 

    <div class="excel__table-row">
        <div class="excel__table-row-info">
            1
        </div> 
        <div class="excel__table-row-data">
            <div class="excel__table-row-data-cell selected"
             contenteditable="true">
                fff
            </div>
            <div class="excel__table-row-data-cell" contenteditable="true">
                gfy
            </div>
            <div class="excel__table-row-data-cell" contenteditable="true">
                yyyuu
            </div>
        </div>
    </div> 
    
    <div class="excel__table-row">
        <div class="excel__table-row-info">
            2
        </div> 
        <div class="excel__table-row-data">
            <div class="excel__table-row-data-cell " contenteditable="true">
                
            </div>
            <div class="excel__table-row-data-cell" contenteditable="true">
                
            </div>
            <div class="excel__table-row-data-cell" contenteditable="true">
                
            </div>
        </div>
    </div> 
    `
  }
}
