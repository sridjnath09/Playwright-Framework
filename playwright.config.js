// @ts-check
import { defineConfig, devices } from '@playwright/test';
//import { config } from 'process';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  timeout:40*1000,
  expect:{
    timeout:5000,
  },
  use: {
    browserName :'firefox',
    headless : false,
    screenshot:'on',
    trace: 'on'
  }, 

  reporter : 'html'
});

module.exports=config

