import type { Config } from '@jest/types';
import path from 'path'

const config: Config.InitialOptions = {
    verbose: true,
    moduleNameMapper: {
        '^.+\\.(css|less|scss|jpg|jpeg|png|gif|eot|otf|webp|svg)$': "babel-jest"
    },
    setupFiles: ["dotenv/config"],
    resetMocks: true,
    moduleDirectories: ['node_modules', path.join(__dirname, 'src')]
}

module.exports = config