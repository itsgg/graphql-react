import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.scss';

const TEST_QUERY = gql`
  query {
    hello
  }
`;

const UPDATE_MESSAGE = gql`
  mutation updateMessage($message: String!) {
    updateMessage(message: $message) {
      message
    }
  }
`;

function App() {
  const tasks = [
    {
      id: 1,
      name: 'Post One',
    },
    {
      id: 2,
      name: 'Post Two',
    },
    {
      id: 3,
      name: 'Post Three',
    },
  ];

  const { loading, error, data } = useQuery(TEST_QUERY);
  const [
    updateMessage,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_MESSAGE);
  

  const onSubmit = (event) => {
    setTaskList([...taskList, { id: taskList.length + 1, name: taskName }]);
    updateMessage({ variables: { message: taskName } });
    console.log('##########');
    console.log(updateData);
    console.log('##########');

    console.log(taskList);
    event.preventDefault();
    console.log('Form submitted');
  };

  const nameChanged = (event) => {
    setTaskName(event.target.value);
  };

  const [taskName, setTaskName] = useState('');
  const [taskList, setTaskList] = useState(tasks);

  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <title>{taskName}</title>
        </Helmet>
        <h1>Hello</h1>
        {updateLoading && <p>Updating...</p>}
        {updateError && <p>Error: {updateError.message}</p>}
        {updateData && <p>{updateData.updateMessage.message}</p>}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>{data.hello}</p>}
        <form onSubmit={onSubmit}>
          <p>
            <input
              type="text"
              value={taskName}
              onChange={nameChanged}
              name="name"
              placeholder="name"
            />
          </p>
          <button type="submit">Submit</button>
        </form>
        <ul>
          {taskList.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      </div>
    </HelmetProvider>
  );
}

export default App;
