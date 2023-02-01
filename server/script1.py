from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from datetime import date

directory = '/Users/khuzaima.saeed/my-app/server'
options = webdriver.ChromeOptions()
# chrome_options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
prefs = {'download.default_directory' : directory}
options.add_experimental_option('prefs', prefs)
driver = webdriver.Chrome('chromedriver',chrome_options=options)
driver.get("https://nrt4.modaps.eosdis.nasa.gov/archive/FIRMS/suomi-npp-viirs-c2/South_Asia")
WebDriverWait(driver, 120).until(lambda x: x.find_element("xpath","/html/body/div[2]/div/div[1]/div/div/div/a"))
driver.find_element(By.XPATH, "/html/body/div[2]/div/div[1]/div/div/div/a").click()
driver.find_element(By.XPATH, "/html/body/div[2]/section[1]/form/p[1]/input").send_keys("khuzaimasaeed@gmail.com")
driver.find_element(By.XPATH, "/html/body/div[2]/section[1]/form/p[2]/input").send_keys("Brownie@99")
driver.find_element(By.XPATH, "/html/body/div[2]/section[1]/form/p[8]/input").click()
driver.implicitly_wait(20)
xpath = '/html/body/div[2]/div/div[1]/div/div/div/div/div[1]/div/table/tbody/tr[62]/td[2]/a'
WebDriverWait(driver, 120).until(lambda x: x.find_element("xpath",xpath))
driver.find_element(By.XPATH, xpath).click()
print("File downloaded")

