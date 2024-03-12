import React from "react";

interface IndexProps {
  title: string;
}

const Index: React.FC<IndexProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Index;
