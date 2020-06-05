import {Page} from '@/core/Page';
import {$} from '@/core/dom';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'dashboard').html(
        `

        <div class="dashboard__header">
            <h1>
                Excel Dashboard
            </h1>
        </div>

        <div class="dashboard__new">
            <div class="dashboard__view">
              <a class="dashboard__new-create" href=""> Новая <br> Таблица</a>
            </div>
        </div>

        <div class="dashboard__table">
            <div class="dashboard__view">
                <div class="dashboard__table-header">
                    <span>
                        Название
                    </span>
                    <span>
                        Дата Открытия
                    </span>

                </div>
                <ul class="dashboard__table-list">
                    <li class="dashboard__table-record">
                        <a href="#">Таблица №1</a>
                        <b>12.06.2020</b>
                    </li>
                    <li class="dashboard__table-record">
                        <a href="#">Таблица №2</a>
                        <b>15.06.2020</b>
                    </li>
                    <li class="dashboard__table-record">
                        <a href="#">Таблица №3</a>
                        <b>07.07.2020</b>
                    </li>
                </ul>
            </div>
        </div>

      `
    )
  }
}
