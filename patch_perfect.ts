import fs from 'fs';

const filePath = 'src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const lineArray = content.split(/\r?\n/);
const idx = lineArray.findIndex(l => l.includes("Direct Launch Admin 🚀"));
if (idx !== -1) {
  // Replace the lines after Direct Launch Admin button with the perfect syntactic sequence:
  lineArray.splice(idx + 4, 15, 
    '                              </div>',
    '                           )}',
    '                        </div>',
    '                     )}',
    '                     </div>',
    '                  </div>',
    '               </div>',
    '            )}'
  );
  fs.writeFileSync(filePath, lineArray.join('\r\n'), 'utf8');
  console.log('Successfully completed the perfect formatting patch!');
} else {
  console.log('Error: Could not locate Direct Launch Admin line.');
}
