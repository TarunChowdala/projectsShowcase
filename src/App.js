import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectItem from './Components/ProjectItem'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here
class App extends Component {
  state = {
    category: categoriesList[0].id,
    projectList: [],
    apiStatus: 'initial',
  }

  componentDidMount() {
    this.getProjectsData()
  }

  onChangeCategory = event => {
    this.setState(
      {category: event.target.value, apiStatus: 'initial'},
      this.getProjectsData,
    )
  }

  getProjectsData = async () => {
    const {category} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${category}`
    const response = await fetch(url)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const formattedData = fetchedData.projects.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))
      console.log(formattedData)
      this.setState({projectList: formattedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  renderProjectList = () => {
    const {projectList} = this.state
    return (
      <ul className="projects-list">
        {projectList.map(eachItem => (
          <ProjectItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#328af2" height="50" width="50" />
    </div>
  )

  renderedFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png "
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  onClickRetry = () => {
    this.setState({apiStatus: 'initial'}, this.getProjectsData)
  }

  render() {
    const {category, apiStatus} = this.state

    let renderedItem
    switch (apiStatus) {
      case 'success':
        renderedItem = this.renderProjectList()
        break
      case 'failed':
        renderedItem = this.renderedFailureView()
        break
      default:
        renderedItem = this.renderLoader()
    }

    return (
      <div className="container">
        <div className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png "
            alt="website logo"
            className="nav-image"
          />
        </div>
        <div className="data-container">
          <select
            value={category}
            className="drop-down"
            onChange={this.onChangeCategory}
          >
            {categoriesList.map(eachList => (
              <option key={eachList.id} value={eachList.id}>
                {eachList.displayText}
              </option>
            ))}
          </select>
          {renderedItem}
        </div>
      </div>
    )
  }
}

export default App
