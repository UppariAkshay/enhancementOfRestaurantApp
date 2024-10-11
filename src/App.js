import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './App.css'

class App extends Component {
  state = {tabSelected: '11', tabsAndDishes: []}

  componentDidMount() {
    this.fetchMenuData()
  }

  fetchMenuData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const responseData = await response.json()
    console.log(responseData)

    this.setState({tabsAndDishes: responseData[0].table_menu_list})
  }

  

  onClickTab = event => {
    this.setState({
      tabSelected: event.target.id,
    })
  }

  displayTabs = () => {
    const {tabsAndDishes, tabSelected} = this.state
    const selectedTabDetails = tabsAndDishes.filter(
      eachTab => tabSelected === eachTab.menu_category_id,
    )

    return (
      <ul className="tabsContainerUL">
        {tabsAndDishes.map(eachTab => (
          <li
            id={eachTab.menu_category_id}
            className={
              tabSelected === eachTab.menu_category_id
                ? 'tabStyleLI tabSelected'
                : 'tabStyleLI'
            }
            onClick={this.onClickTab}
          >
            {eachTab.menu_category}
          </li>
        ))}
      </ul>
    )
  }

  displayDishes = () => {
    const {tabSelected, tabsAndDishes} = this.state
    const selectedTabDetails = tabsAndDishes.filter(
      eachTab => tabSelected === eachTab.menu_category_id,
    )
    const dishes = selectedTabDetails.category_dishes

    return dishes.map(eachDish => (
      <DishCard key={eachDish.dish_id} dishDetails={eachDish} />
    ))
  }

  render() {
    const {tabSelected} = this.state

    return (
      <div>
        <div className="header">
          <h1>UNI Resto Cafe</h1>
          <div>
            <h1>
              My orders{' '}
              <span>
                <AiOutlineShoppingCart />
              </span>
            </h1>
          </div>
        </div>

        {this.displayTabs()}


      </div>
    )
  }
}

export default App