import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import * as services from '../../services';
import { position, metricData, imperialData } from './dummy'
import Widget from '../Widget';

describe('Widget component', () => {

    beforeEach(() => {

        jest.spyOn(services, 'getWBC').mockImplementation((long, lat, unit) => {
            if (unit === "metric") return Promise.resolve(metricData)
            else return Promise.resolve(imperialData)
        });
        
        global.navigator.geolocation = {
            getCurrentPosition: jest.fn().mockImplementationOnce((success) => Promise.resolve(success(position)))
        };
    });

    test('show show spinner upon loading the component.', async () => {
        
        var loading = true;
        act(() => {
            render(<Widget />);
        });

        if (loading)
            expect(document.querySelector('.visual .spinner')).not.toBeNull();
        else
            expect(document.querySelector('.visual .spinner')).toBeNull();

        await waitFor(() => screen.getByRole('heading', {name: /15/i}));
        loading = false;

        if (!loading)
            expect(document.querySelector('.visual .spinner')).toBeNull();
        else
            expect(document.querySelector('.visual .spinner')).not.toBeNull();

    })

    test('should show 15°C temperature and Haze in the description div.', async () => {
        
        act(() => {
            render(<Widget />);
        });

        await waitFor(() => screen.getByRole('heading', {name: /15/i}));
        const descElem = screen.getByRole('heading', {name: /15/i});
        expect(descElem.textContent).toContain('°C')
        expect(descElem.textContent).toContain('haze')
    });

    test('should show the changed widget title when user changes it in the input box.', async () => {
        
        act(() => {
            render(<Widget />);
        });

        await waitFor(() => screen.getByRole('heading', {name: /15/i}));
        const titleInput = screen.getByRole('textbox');
        fireEvent.change(titleInput, { target: { value: "Rafael" }});

        const titleBox = document.querySelector('.header h2');
        expect(titleBox.textContent).toBe('Rafael');

        await waitFor(() => screen.getByRole('heading', {name: /15/i}));
        fireEvent.change(titleInput, { target: { value: "" }});
        expect(titleBox.textContent).toBe('Title of Widget');
    });

    test('should show 66°F temperature and haze in the description div when user click on °F radio button.', async () => {
        
        act(() => {
            render(<Widget />);
        });

        await waitFor(() => screen.getByRole('heading', {name: /15/i}));
        const temperatureRight = document.querySelector('input.right');
        fireEvent.click(temperatureRight);
        await waitFor(() => screen.getByRole('heading', {name: /66/i}));
        const descElem = screen.getByRole('heading', {name: /66/i});
        expect(descElem.textContent).toContain('°F')
    });

    test('should show back 15°C temperature and haze in the description div when user click on °C radio button.', async () => {

        act(() => {
            render(<Widget />);
        });

        await waitFor(() => screen.getByRole('heading', {name: /15/i}));
        const temperatureLeft = document.querySelector('input.left');
        fireEvent.click(temperatureLeft);
        await waitFor(() => screen.getByRole('heading', {name: /15/i}));
        const descElem = screen.getByRole('heading', {name: /15/i});
        expect(descElem.textContent).toContain('°C')
    });

    test('should hide wind div when the user click on OFF button.',  async () => {

        act(() => {
            render(<Widget />);
        });

        await waitFor(() => screen.getByRole('heading', {name: /15/i}));
        const windRight = document.querySelector('.windInput input.right');
        fireEvent.click(windRight);
        const windDiv = document.querySelector('.visual .wind');
        expect(windDiv).toBeNull();
        
    });

    test('should show back wind div when the user clicks on ON button and 0 km/h information.',  async () => {
       
        act(() => {
            render(<Widget />);
        });

        await waitFor(() => screen.getByRole('heading', {name: /15/i}));
        const windLeft = document.querySelector('.windInput input.left');
        fireEvent.click(windLeft);
        const windDiv = document.querySelector('.visual .wind p');
        expect(windDiv.textContent).toContain('0 km/h');
        
    });

    test('should indicate that weatherView section has weatherBoxNight, not weatherBoxDay class.',  async () => {
       
        act(() => {
            render(<Widget />);
        });

        var icon = '20n'; // Just followed the same convention in the code
        await waitFor(() => screen.getByRole('heading', {name: /15/i}));
        if (icon[2] === 'n') {
            expect(document.querySelector('.weatherView .weatherBoxNight')).not.toBeNull();
            expect(document.querySelector('.weatherView .weatherBoxDay')).toBeNull();
        }
        else {
            expect(document.querySelector('.weatherView .weatherBoxDay')).not.toBeNull();
            expect(document.querySelector('.weatherView .weatherBoxNight')).toBeNull();
        }
        
    });

    test('should indicate that cardinalDirection is "S".',  async () => {
       
        act(() => {
            render(<Widget />);
        });

        await waitFor(() => screen.getByRole('heading', {name: /15/i}));

        const getCardinalDirection = jest.fn((angle) => {
            const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            return directions[Math.round(angle / 45) % 8];
        });

        const degree = 200;
        const cardinalDirection = getCardinalDirection(degree)
        const windDiv = document.querySelector('.visual .wind p');
        expect(windDiv.textContent).toContain(cardinalDirection);
        
    });
});