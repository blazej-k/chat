import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    moduleNameMapper: {
        '^.+\\.(css|less|scss|jpg|jpeg|png|gif|eot|otf|webp|svg)$': "babel-jest"
    }
}

module.exports = config