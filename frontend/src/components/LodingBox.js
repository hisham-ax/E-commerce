import Spinner from 'react-bootstrap/Spinner';
function LodingBox() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Lodding...</span>
    </Spinner>
  );
}

export default LodingBox;
