import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Game from "./Game";
import Dice from "./Dice"
import Die from "./Die"

it("renders without crashing", function() {
  shallow(<Game />);
});

it("tests if when clicked on dice it is locked", function() {
    const lockedBoxMock = jest.fn();
    const dice = [1,2,3,4,5]
    let wrapper = shallow (<Die toggleLocked={lockedBoxMock} val={dice[0]}
        locked={true}
        idx={0}
        key={0} /> );
    
    wrapper.find("button").simulate("click");
    expect(lockedBoxMock).toHaveBeenCalled();

});


