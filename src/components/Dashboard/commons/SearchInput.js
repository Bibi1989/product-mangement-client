import React from "react";
import { Form } from "semantic-ui-react";

const SearchInput = ({ handleSearch }) => {
  return (
    <Form style={{ width: "30%" }}>
      <Form.Field>
        <input placeholder='Search for projects...' onChange={handleSearch} />
      </Form.Field>
    </Form>
  );
};

export default SearchInput;
