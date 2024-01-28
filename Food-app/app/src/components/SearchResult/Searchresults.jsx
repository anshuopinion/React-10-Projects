import styled from "styled-components";

export default function Searchresults(props) {
  return (
    <div>
      <FoodContainer>
        <FoodCards>
          {props.data.map((value) => (
            <FoodCard key={value.name}>
              <Image>cds</Image>
              <Text>
                <Title>{value.name}</Title>
                <Description>{value.description}</Description>
              </Text>
            </FoodCard>
          ))}
        </FoodCards>
      </FoodContainer>
    </div>
  );
}

const FoodContainer = styled.main`
  // Add styles here
`;
const FoodCards = styled.div`
  // Add styles here
`;
const FoodCard = styled.div`
  // Add styles here
`;
const Image = styled.div``;
const Text = styled.div``;
const Title = styled.div``;
const Description = styled.div``;
