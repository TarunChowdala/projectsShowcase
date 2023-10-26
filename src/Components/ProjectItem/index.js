import './index.css'

const ProjectItem = props => {
  const {eachItem} = props
  return (
    <li className="project-item">
      <img
        src={eachItem.imageUrl}
        alt={eachItem.name}
        className="project-img"
      />
      <p className="project-name">{eachItem.name}</p>
    </li>
  )
}

export default ProjectItem
